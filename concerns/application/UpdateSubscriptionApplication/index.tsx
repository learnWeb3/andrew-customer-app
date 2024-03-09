import { Grid } from "@mui/material";
import { MultiStepForm } from "../../../components/MultiStepForm";
import { UserInformationStep } from "./UserInformationStep";
import { InsuranceProductChoiceStep } from "./InsuranceProductChoiceStep";
import { VehiclesInformationsStep } from "./VehiclesInformationsStep";
import { ContractAndTermsOfSalesStep } from "./ContractAndTermsOfSalesStep";
import { ApplicationStatus } from "../../../lib/application-status.enum";
import { useState } from "react";
import {
  computeMissingIdentityDocumentErrors,
  computeMissingVehiclesDocumentErrors,
} from "./MissingDocumentErrors/useMissingDocumentsErrors";
import {
  reviewSubscriptionApplication,
  updateSubscriptionApplication,
} from "../../../services/andrew-api.service";
import { removeEmptyKeys } from "../../../lib/remove-empty-keys.helper";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { errorToast, successToast } from "../../../lib/toast.helpers";
import { useRouter } from "next/router";

export interface UpdateSubscriptionApplicationProps {
  application: UpdateSubscriptionApplicationData | null;
  setApplication: (application: UpdateSubscriptionApplicationData) => void;
  mb?: number;
}

export interface UpdateSubscriptionApplicationData {
  _id: string;
  ref?: string;
  status?: ApplicationStatus;
  vehicles: {
    vin?: string;
    brand?: string;
    model?: string;
    year?: number;
    registrationNumber?: string;
    originalInServiceDate?: string;
    contractSubscriptionKm?: number;
    driverLicenceDocURL?: string;
    vehicleRegistrationCardDocURL?: string;
  }[];
  contract?: {
    contractDocURL?: string;
    ecommerceGateway?: string;
    ecommerceProduct?: string;
    contract?: string;
  };
  contactInformations?: {
    phoneNumber?: string;
    email?: string;
  };
  billingInformations?: {
    lastName?: string;
    firstName?: string;
    company?: string;
    address?: string;
    postCode?: string;
    city?: string;
    country?: string;
  };
  identityDocs?: {
    idCardDocURL?: string;
    residencyProofDocURL?: string;
  };
  paymentDocs?: {
    termsOfSaleDocURL?: string;
  };
  statusHistory?: {
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
    comment: string;
  }[];
}

export function UpdateSubscriptionApplication({
  application = null,
  setApplication = (application) => {},
  mb = 0,
}: UpdateSubscriptionApplicationProps) {
  const router = useRouter();
  const steps = [
    {
      title: "User informations",
      component: UserInformationStep,
      validate: (data: UpdateSubscriptionApplicationData) => {
        const errors = [];
        if (!data.billingInformations?.address) {
          errors.push("Missing address");
        }
        if (!data.billingInformations?.city) {
          errors.push("Missing city");
        }
        if (!data.billingInformations?.postCode) {
          errors.push("Missing postcode");
        }
        if (!data.billingInformations?.country) {
          errors.push("Missing country");
        }
        if (!data.billingInformations?.lastName) {
          errors.push("Missing lastName");
        }
        if (!data.billingInformations?.firstName) {
          errors.push("Missing firstName");
        }
        errors.push(...computeMissingIdentityDocumentErrors(data));
        return {
          errors,
          valid: !errors.length,
        };
      },
    },
    {
      title: "Select your insurance product",
      component: InsuranceProductChoiceStep,
      validate: (data: UpdateSubscriptionApplicationData) => {
        const errors = [];
        if (!data.contract?.ecommerceProduct) {
          errors.push("Please select a subscription plan");
        }
        return {
          errors,
          valid: !errors.length,
        };
      },
    },
    {
      title: "Vehicles informations",
      component: VehiclesInformationsStep,
      validate: (data: UpdateSubscriptionApplicationData) => {
        const errors = [];
        errors.push(...computeMissingVehiclesDocumentErrors(data));
        errors.push(
          ...data?.vehicles?.reduce((errors, vehicle, index) => {
            if (!vehicle?.brand) {
              errors.push(`Vehicle ${index + 1} missing brand`);
            }
            if (!vehicle?.model) {
              errors.push(`Vehicle ${index + 1} missing brand`);
            }
            if (!vehicle?.contractSubscriptionKm) {
              errors.push(
                `Vehicle ${index + 1} missing contract subscription Km`
              );
            }
            if (!vehicle?.originalInServiceDate) {
              errors.push(
                `Vehicle ${index + 1} missing original in service data`
              );
            }
            if (!vehicle?.vin) {
              errors.push(`Vehicle ${index + 1} missing vin`);
            }
            if (!vehicle?.year) {
              errors.push(`Vehicle ${index + 1} missing model year`);
            }
            return errors;
          }, [] as string[])
        );
        return {
          errors: errors.sort((a, b) => a.localeCompare(b)),
          valid: !errors.length,
        };
      },
    },
    {
      title: "Contract and terms of sales",
      component: ContractAndTermsOfSalesStep,
      validate: (data: UpdateSubscriptionApplicationData) => ({
        errors: [],
        valid: true,
      }),
    },
  ];

  const { accessToken } = useOidcAccessToken();

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

  return application ? (
    <Grid
      container
      item
      xs={12}
      justifyContent="flex-start"
      alignItems="flex-start"
      height={"100vh"}
      width={"100vw"}
      mb={mb}
    >
      <Grid item xs={12}>
        <MultiStepForm
          setData={setApplication}
          data={application}
          save={async (application) => {
            try {
              await updateSubscriptionApplication(
                application._id,
                removeEmptyKeys(application),
                accessToken
              ).then(() => setApplication({ ...application }));
              successToast(`success updating your subscription application`);
            } catch (error) {
              console.log(error);
              errorToast(
                `error updating your subscription application, please retry again later or contact support`
              );
            }
          }}
          initialActiveStepIndex={0}
          steps={steps}
          errors={errors}
          setErrors={setErrors}
          onPrevious={(data) => {}}
          onNext={(data) => {}}
          onSubmit={async (application) => {
            try {
              await updateSubscriptionApplication(
                application._id,
                removeEmptyKeys(application),
                accessToken
              );

              // update status to reviewing
              await reviewSubscriptionApplication(application._id, accessToken);

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
        />
      </Grid>
    </Grid>
  ) : null;
}
