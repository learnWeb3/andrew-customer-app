import { useState } from "react";

export function usePagination(defaultPageSize: number, defaultPage: number) {
  const [pagination, setPagination] = useState<{
    pageSize: number;
    page: number;
  }>({
    pageSize: defaultPageSize,
    page: defaultPage,
  });

  return {
    pagination,
    setPagination,
  };
}
