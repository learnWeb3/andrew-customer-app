import { OidcSecure, useOidcAccessToken } from "@axa-fr/react-oidc";
import { AuthenticatedLayout } from "../../components/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { createSubscriptionApplication } from "../../services/andrew-api.service";
import {
  UpdateSubscriptionApplication,
  UpdateSubscriptionApplicationData,
} from "../../concerns/application/UpdateSubscriptionApplication";

export default function NewApplication() {
  const { accessToken } = useOidcAccessToken();
  const [newApplication, setNewApplication] =
    useState<UpdateSubscriptionApplicationData | null>(null);
  useEffect(() => {
    !newApplication &&
      createSubscriptionApplication(accessToken).then((newApplication) =>
        setNewApplication({
          _id: newApplication._id,
          ref: newApplication.ref,
          status: newApplication.status,
          vehicles: newApplication?.vehicles?.length
            ? newApplication.vehicles
            : [],
          contract: {
            contractDocURL: "",
            ecommerceProduct: "",
          },
          contactInformations: {
            phoneNumber:
              newApplication?.customer?.contactInformations?.phoneNumber || "",
            email: newApplication?.customer?.contactInformations?.email || "",
          },
          billingInformations: {
            ...(newApplication?.customer?.billingInformations
              ? {
                  lastName: "",
                  firstName: "",
                  company: "",
                  address: "",
                  postCode: "",
                  city: "",
                  country: "",
                  ...newApplication.customer.billingInformations,
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
              newApplication?.customer?.identityDocs?.idCardDocURL || "",
            residencyProofDocURL:
              newApplication?.customer?.identityDocs?.residencyProofDocURL ||
              "",
          },
          paymentDocs: {
            termsOfSaleDocURL: "",
          },
        })
      );
  }, [accessToken]);

  return (
    <OidcSecure>
      <UpdateSubscriptionApplication
        application={newApplication}
        setApplication={setNewApplication}
      />
    </OidcSecure>
  );
}

NewApplication.getLayout = function getLayout(page: any) {
  return <AuthenticatedLayout onlyAuth={true}>{page}</AuthenticatedLayout>;
};
