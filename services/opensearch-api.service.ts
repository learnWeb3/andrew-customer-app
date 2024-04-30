import { OidcClient } from "@axa-fr/react-oidc";
import axios, { AxiosResponse } from "axios";
import { configuration } from "../components/AuthenticatedLayout";

const opensearchApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPENSEARCH_ROOT_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

opensearchApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const oidc = OidcClient.getOrCreate(() => fetch)(configuration);
        await oidc.renewTokensAsync();
        const getValidToken = await oidc.getValidTokenAsync();
        if (!getValidToken || !getValidToken.isTokensValid) {
          return oidc.loginAsync(undefined, undefined);
        }
        const access_token = getValidToken?.tokens?.accessToken;
        opensearchApi.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        return opensearchApi(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export function getAuthorizationHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function getVehiclesDataPointCountHistogram(
  accessToken: string,
  vehcilesVIN: string[] = [],
  options: {
    from: number;
    interval: "year" | "week" | "month" | "day" | "hour";
  }
) {
  const intervalToFormatMap = {
    year: "yyyy",
    week: "yyyy-w",
    month: "yyyy-MM",
    day: "yyyy-MM-dd",
    hour: "yyyy-MM-dd:HH",
  };
  const endpoint = `/acl/_search`;
  const headers = {
    ...getAuthorizationHeaders(accessToken),
  };

  const query = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            has_parent: {
              parent_type: "vehicle",
              query: {
                bool: {
                  should: [
                    ...vehcilesVIN.map((vin) => ({
                      match: { vehicle: vin },
                    })),
                    {
                      range: {
                        timestamp: {
                          gte: options.from,
                          format: "epoch_millis",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    aggs: {
      time_periods: {
        date_histogram: {
          field: "timestamp",
          interval: options.interval,
          format: intervalToFormatMap[options.interval],
          min_doc_count: 0,
        },
        aggs: {
          count: {
            value_count: {
              field: "_id",
            },
          },
        },
      },
    },
  };

  return opensearchApi
    .post<
      any,
      AxiosResponse<{
        took: number;
        timed_out: boolean;
        _shards: {
          total: number;
          successful: number;
          skipped: number;
          failed: number;
        };
        hits: {
          total: {
            value: number;
            relation: string;
          };
          max_score: null;
          hits: never[];
        };
        aggregations: {
          time_periods: {
            buckets: {
              key_as_string: string;
              key: number;
              doc_count: number;
              count: {
                value: number;
              };
            }[];
          };
        };
      }>
    >(endpoint, query, {
      headers,
    })
    .then((response) => response.data.aggregations.time_periods.buckets);
}

export async function getVehiclesAverageBehaviourClassIntHistogram(
  accessToken: string,
  vehcilesVIN: string[] = [],
  options: { from: number; interval: "year" | "week" | "month" | "day" }
) {
  const intervalToFormatMap = {
    year: "yyyy",
    week: "yyyy-w",
    month: "yyyy-MM",
    day: "yyyy-MM-dd",
  };
  const endpoint = `/acl_report/_search`;
  const headers = {
    ...getAuthorizationHeaders(accessToken),
  };

  const query = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            has_parent: {
              parent_type: "vehicle",
              query: {
                bool: {
                  should: vehcilesVIN.map((vin) => ({
                    match: { vehicle: vin },
                  })),
                },
              },
            },
          },
          {
            nested: {
              path: "report.driving_session",
              query: {
                range: {
                  "report.driving_session.start": {
                    gte: options.from,
                    format: "epoch_millis",
                  },
                },
              },
            },
          },
        ],
      },
    },
    aggs: {
      nested_reports: {
        nested: {
          path: "report.driving_session",
        },
        aggs: {
          time_periods: {
            date_histogram: {
              field: "report.driving_session.start",
              interval: options.interval,
              format: intervalToFormatMap[options.interval],
              min_doc_count: 0,
            },
            aggs: {
              average_driver_behaviour: {
                avg: {
                  field: "report.driving_session.driver_behaviour_class_int",
                },
              },
            },
          },
        },
      },
    },
  };

  return opensearchApi
    .post<
      any,
      AxiosResponse<{
        took: number;
        timed_out: boolean;
        _shards: {
          total: number;
          successful: number;
          skipped: number;
          failed: number;
        };
        hits: {
          total: {
            value: number;
            relation: string;
          };
          max_score: null;
          hits: never[];
        };
        aggregations: {
          nested_reports: {
            doc_count: number;
            time_periods: {
              buckets: {
                key_as_string: string;
                key: number;
                doc_count: number;
                average_driver_behaviour: {
                  value: number;
                };
              }[];
            };
          };
        };
      }>
    >(endpoint, query, {
      headers,
    })
    .then((response) => response.data.aggregations.nested_reports.time_periods);
}

export async function getVehiclesMetricsReports(
  accessToken: string,
  vehcilesVIN: string[] = [],
  start = 0,
  limit = 10
) {
  const endpoint = `/acl_report/_search`;
  const headers = {
    ...getAuthorizationHeaders(accessToken),
  };

  const query = {
    from: start,
    size: limit,
    query: {
      bool: {
        must: [
          {
            has_parent: {
              parent_type: "vehicle",
              query: {
                bool: {
                  should: vehcilesVIN.map((vin) => ({
                    match: { vehicle: vin },
                  })),
                },
              },
            },
          },
        ],
      },
    },
  };

  return opensearchApi
    .post<
      any,
      AxiosResponse<{
        took: number;
        timed_out: boolean;
        _shards: {
          total: number;
          successful: number;
          skipped: number;
          failed: number;
        };
        hits: {
          total: {
            value: number;
            relation: string;
          };
          max_score: null;
          hits: {
            _index: string;
            _id: string;
            _score: number;
            _routing: string;
            _source: {
              vehicle: string;
              device: string;
              report: {
                driving_session: {
                  start: number;
                  end: number;
                  driver_behaviour_class: string;
                  driver_behaviour_class_int: number;
                };
              };
              report_to_vehicle: {
                name: string;
                parent: string;
              };
            };
          }[];
        };
      }>
    >(endpoint, query, {
      headers,
    })
    .then((response) => {
      const count = response.data.hits.total.value;
      const results = response.data.hits.hits.map(({ _id, _source }) => ({
        _id,
        ..._source,
      }));
      return {
        start,
        limit,
        count,
        results,
      };
    });
}

export async function getVehiclesAverageBehaviourClassInt(
  accessToken: string,
  vehcilesVIN: string[] = [],
  options: { periodicity: "year" | "month" | "week" | "day" }
) {
  const periodicityToFromMap = {
    year: () => Date.now() - 365 * 24 * 60 * 60 * 1000,
    month: () => Date.now() - 31 * 24 * 60 * 60 * 1000,
    week: () => Date.now() - 7 * 24 * 60 * 60 * 1000,
    day: () => Date.now() - 24 * 60 * 60 * 1000,
  };
  const endpoint = `/acl_report/_search`;
  const headers = {
    ...getAuthorizationHeaders(accessToken),
  };

  const query = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            has_parent: {
              parent_type: "vehicle",
              query: {
                bool: {
                  should: vehcilesVIN.map((vin) => ({
                    match: { vehicle: vin },
                  })),
                },
              },
            },
          },
          {
            nested: {
              path: "report.driving_session",
              query: {
                range: {
                  "report.driving_session.start": {
                    gte: periodicityToFromMap[options.periodicity](),
                    format: "epoch_millis",
                  },
                },
              },
            },
          },
        ],
      },
    },
    aggs: {
      nested_reports: {
        nested: {
          path: "report.driving_session",
        },
        aggs: {
          average_driver_behaviour: {
            avg: {
              field: "report.driving_session.driver_behaviour_class_int",
            },
          },
        },
      },
    },
  };

  return opensearchApi
    .post<
      any,
      AxiosResponse<{
        took: number;
        timed_out: boolean;
        _shards: {
          total: number;
          successful: number;
          skipped: number;
          failed: number;
        };
        hits: {
          total: {
            value: number;
            relation: string;
          };
          max_score: null;
          hits: never[];
        };
        aggregations: {
          nested_reports: {
            doc_count: number;
            average_driver_behaviour: {
              value: number;
            };
          };
        };
      }>
    >(endpoint, query, {
      headers,
    })
    .then(
      (response) =>
        response.data.aggregations.nested_reports.average_driver_behaviour.value
    );
}
