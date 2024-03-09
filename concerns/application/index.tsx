import { Box, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { ApplicationStatusDropdown } from "./ApplicationSatusDropdown";
import {
  findSubscriptionApplication,
  reviewSubscriptionApplication,
  updateSubscriptionApplication,
} from "../../services/andrew-api.service";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { UserInformationStep } from "./UpdateSubscriptionApplication/UserInformationStep";
import { UpdateSubscriptionApplicationData } from "./UpdateSubscriptionApplication";
import { InsuranceProductChoiceStep } from "./UpdateSubscriptionApplication/InsuranceProductChoiceStep";
import { VehiclesInformationsStep } from "./UpdateSubscriptionApplication/VehiclesInformationsStep";
import { ContractAndTermsOfSalesStep } from "./UpdateSubscriptionApplication/ContractAndTermsOfSalesStep";
import { StepTitle } from "./UpdateSubscriptionApplication/StepTitle";
import { ChangesValidationStep } from "./UpdateSubscriptionApplication/ChangesValidationStep";
import { AlertStatus } from "./UpdateSubscriptionApplication/AlertStatus";
import { ValidationErrors } from "./UpdateSubscriptionApplication/ValidationErrors";
import { removeEmptyKeys } from "../../lib/remove-empty-keys.helper";
import { errorToast, successToast } from "../../lib/toast.helpers";
import { MissingDocumentErrors } from "./UpdateSubscriptionApplication/MissingDocumentErrors";
import { useRouter } from "next/router";
import { ApplicationStatus } from "../../lib/application-status.enum";
import { MissingVehiclesErrors } from "./UpdateSubscriptionApplication/MissingVehiclesErrors";
import { MissingInsuranceProductErrors } from "./UpdateSubscriptionApplication/MissingInsuranceProductErrors";

export interface ApplicationConcernProps {
  id: string | null;
}

export function ApplicationConcern({ id = null }: ApplicationConcernProps) {
  const { accessToken } = useOidcAccessToken();
  const router = useRouter();
  const [application, setApplication] =
    useState<UpdateSubscriptionApplicationData | null>(null);

  useEffect(() => {
    if (id && accessToken) {
      findSubscriptionApplication(id, accessToken).then((application) => {
        setApplication({
          _id: application._id,
          ref: application.ref,
          status: application.status,
          vehicles: application?.vehicles?.length ? application.vehicles : [],
          contract: {
            contractDocURL: application?.contract?.contractDocURL || "",
            ecommerceProduct: application?.contract?.ecommerceProduct || "",
            ecommerceGateway: application?.contract?.ecommerceGateway || "",
            contract: application?.contract?.contract || "",
          },
          contactInformations: {
            phoneNumber:
              application?.customer?.contactInformations?.phoneNumber || "",
            email: application?.customer?.contactInformations?.email || "",
          },
          billingInformations: {
            ...(application?.customer?.billingInformations
              ? {
                  lastName: "",
                  firstName: "",
                  company: "",
                  address: "",
                  postCode: "",
                  city: "",
                  country: "",
                  ...application.customer.billingInformations,
                }
              : {
                  lastName: "",
                  firstName: "",
                  company: "",
                  address: "",
                  postCode: "",
                  city: "",
                  country: "",
                }),
          },
          identityDocs: {
            idCardDocURL:
              application?.customer?.identityDocs?.idCardDocURL || "",
            residencyProofDocURL:
              application?.customer?.identityDocs?.residencyProofDocURL || "",
          },
          paymentDocs: {
            termsOfSaleDocURL: "",
          },
          statusHistory: application.statusHistory || [],
        });
      });
    }
  }, [id, accessToken]);

  const [errors, setErrors] = useState<{ [field: string]: string[] }>({
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    address: [],
    city: [],
    postCode: [],
    country: [],
  });

  return (
    <Grid container spacing={4} mb={4}>
      <Grid item xs={12}>
        <Breadcrumb
          parts={
            application
              ? [
                  {
                    label: "Applications",
                    href: "/applications",
                  },
                  {
                    label: application.ref as string,
                    href: `/applications/${application._id}`,
                  },
                ]
              : [
                  {
                    label: "Applications",
                    href: "/applications",
                  },
                ]
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={9}
        sx={{ display: "flex", alignItems: "center", gap: 4 }}
      >
        <Typography variant="h6" component="h2">
          Ref: {application?.ref}
        </Typography>

        <ApplicationStatusDropdown activeItemId={application?.status || null} />
      </Grid>
      <Grid item xs={12}>
        <AlertStatus
          status={application?.status || null}
          statusHistory={application?.statusHistory}
        />
      </Grid>
      {application ? (
        <>
          <Grid item xs={12}>
            <StepTitle title="User informations" number={1} />
          </Grid>
          <Grid item xs={12}>
            <UserInformationStep
              save={async (application) => {
                try {
                  await updateSubscriptionApplication(
                    application._id,
                    removeEmptyKeys(application),
                    accessToken
                  ).then(() => setApplication({ ...application }));
                  successToast(
                    `success updating your subscription application`
                  );
                } catch (error) {
                  console.log(error);
                  errorToast(
                    `error updating your subscription application, please retry again later or contact support`
                  );
                }
              }}
              data={application}
              setData={setApplication}
              errors={errors}
              setErrors={setErrors}
              readOnly={
                application?.status === ApplicationStatus.REVIEWING ||
                application?.status === ApplicationStatus.PAYMENT_PENDING ||
                application?.status === ApplicationStatus.PAYMENT_CONFIRMED ||
                application?.status === ApplicationStatus.REJECTED
              }
            />
          </Grid>
          <Grid item xs={12}>
            <StepTitle title="Your insurance product" number={2} />
          </Grid>
          <Grid item xs={12}>
            <InsuranceProductChoiceStep
              data={application}
              setData={setApplication}
              errors={errors}
              setErrors={setErrors}
              save={async (application) => {
                try {
                  await updateSubscriptionApplication(
                    application._id,
                    removeEmptyKeys(application),
                    accessToken
                  ).then(() => setApplication({ ...application }));
                  successToast(
                    `success updating your subscription application`
                  );
                } catch (error) {
                  console.log(error);
                  errorToast(
                    `error updating your subscription application, please retry again later or contact support`
                  );
                }
              }}
              readOnly={
                application?.status === ApplicationStatus.REVIEWING ||
                application?.status === ApplicationStatus.PAYMENT_PENDING ||
                application?.status === ApplicationStatus.PAYMENT_CONFIRMED ||
                application?.status === ApplicationStatus.REJECTED
              }
            />
          </Grid>
          <Grid item xs={12}>
            <StepTitle title="Vehicles informations" number={3} />
          </Grid>
          <Grid item xs={12}>
            <VehiclesInformationsStep
              data={application}
              setData={setApplication}
              errors={errors}
              setErrors={setErrors}
              save={async (application) => {
                try {
                  await updateSubscriptionApplication(
                    application._id,
                    removeEmptyKeys(application),
                    accessToken
                  ).then(() => setApplication({ ...application }));
                  successToast(
                    `success updating your subscription application`
                  );
                } catch (error) {
                  console.log(error);
                  errorToast(
                    `error updating your subscription application, please retry again later or contact support`
                  );
                }
              }}
              readOnly={
                application?.status === ApplicationStatus.REVIEWING ||
                application?.status === ApplicationStatus.PAYMENT_PENDING ||
                application?.status === ApplicationStatus.PAYMENT_CONFIRMED ||
                application?.status === ApplicationStatus.REJECTED
              }
            />
          </Grid>
          <Grid item xs={12}>
            <StepTitle title="Contract and terms of sales" number={4} />
          </Grid>

          <Grid item xs={12}>
            <ContractAndTermsOfSalesStep
              errors={errors}
              setErrors={setErrors as any}
              data={application}
              setData={setApplication}
              save={async (application) => {
                try {
                  await updateSubscriptionApplication(
                    application._id,
                    removeEmptyKeys(application),
                    accessToken
                  ).then(() => setApplication({ ...application }));
                  successToast(
                    `success updating your subscription application`
                  );
                } catch (error) {
                  console.log(error);
                  errorToast(
                    `error updating your subscription application, please retry again later or contact support`
                  );
                }
              }}
              readOnly={
                application?.status === ApplicationStatus.REVIEWING ||
                application?.status === ApplicationStatus.PAYMENT_PENDING ||
                application?.status === ApplicationStatus.PAYMENT_CONFIRMED ||
                application?.status === ApplicationStatus.REJECTED
              }
            />
          </Grid>

          {application?.status === ApplicationStatus.REVIEWING ||
          application?.status === ApplicationStatus.PAYMENT_CONFIRMED ||
          application?.status === ApplicationStatus.REJECTED ? null : (
            <Grid item xs={12}>
              <StepTitle title="Application submission" number={5} />
            </Grid>
          )}

          {application?.status === ApplicationStatus.REVIEWING ||
          application?.status === ApplicationStatus.PAYMENT_CONFIRMED ||
          application?.status === ApplicationStatus.REJECTED ? null : (
            <Grid item xs={12}>
              <MissingInsuranceProductErrors data={application} />
              <ValidationErrors errors={errors} />
              <MissingVehiclesErrors data={application} />
              <MissingDocumentErrors data={application} />
            </Grid>
          )}

          <Grid item xs={12}>
            <ChangesValidationStep
              errors={errors}
              setErrors={setErrors}
              data={application}
              setData={setApplication}
              pay={async (application) => {
                if (application?.contract?.contract) {
                  router.push(`/contracts/${application.contract.contract}`);
                }
              }}
              save={async (application) => {
                try {
                  await updateSubscriptionApplication(
                    application._id,
                    removeEmptyKeys(application),
                    accessToken
                  ).then(() => setApplication({ ...application }));
                  successToast(
                    `success updating your subscription application`
                  );
                } catch (error) {
                  console.log(error);
                  errorToast(
                    `error updating your subscription application, please retry again later or contact support`
                  );
                }
              }}
              review={async (application) => {
                try {
                  await updateSubscriptionApplication(
                    application._id,
                    removeEmptyKeys(application),
                    accessToken
                  );
                  await reviewSubscriptionApplication(
                    application._id,
                    accessToken
                  );
                  router.push(
                    `/applications?status=${ApplicationStatus.REVIEWING}`
                  );
                  successToast(
                    `We have registered your subscription application, the review process can take up to 2-5 business days`
                  );
                } catch (error) {
                  console.log(error);
                  errorToast(
                    `error updating your subscription application, please retry again later or contact support`
                  );
                }
              }}
              readOnly={
                application?.status === ApplicationStatus.REVIEWING ||
                application?.status === ApplicationStatus.PAYMENT_CONFIRMED ||
                application?.status === ApplicationStatus.REJECTED
              }
            />
          </Grid>
        </>
      ) : false}
    </Grid>
  );
}
