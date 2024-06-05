import { useEffect, useState } from "react";
import { UpdateSubscriptionApplicationData } from "..";

export function computeMissingVehiclesDocumentErrors(
  data: UpdateSubscriptionApplicationData
) {
  const errors: string[] = data?.vehicles?.length
    ? data.vehicles.reduce((errors, vehicle, index) => {
        if (!vehicle?.driverLicenceDocURL) {
          errors.push(`Vehicle ${index + 1} missing driver license document`);
        }
        if (!vehicle?.vehicleRegistrationCardDocURL) {
          errors.push(
            `Vehicle ${index + 1} missing registration card document`
          );
        }
        return errors;
      }, [] as string[])
    : [];
  return errors;
}

export function computeMissingContractsDocumentErrors(
  data: UpdateSubscriptionApplicationData
) {
  // console.log(JSON.stringify(data, null, 4))
  const errors: string[] = [];
  if (!data?.contract?.contractDocURL) {
    errors.push(`Missing signed contract document`);
  }
  return errors;
}

export function computeMissingIdentityDocumentErrors(
  data: UpdateSubscriptionApplicationData
) {
  const errors: string[] = [];
  if (!data?.identityDocs?.idCardDocURL) {
    errors.push(`Missing id card document`);
  }
  if (!data?.identityDocs?.residencyProofDocURL) {
    errors.push(`Missing residency proof document`);
  }
  return errors;
}

export function useMissingDocumentsErrors(
  data: UpdateSubscriptionApplicationData
) {
  const [missingIdentityDocumentsErrors, setMissingIdentityDocumentsErrors] =
    useState<string[]>([]);
  const [missingVehiclesDocumentsErrors, setMissingVehiclesDocumentsErrors] =
    useState<string[]>([]);
  const [missingContractsDocumentsErrors, setMissingContractsDocumentsErrors] =
    useState<string[]>([]);

  useEffect(() => {
    setMissingVehiclesDocumentsErrors(
      computeMissingVehiclesDocumentErrors(data)
    );
    setMissingIdentityDocumentsErrors(
      computeMissingIdentityDocumentErrors(data)
    );
    setMissingContractsDocumentsErrors(
      computeMissingContractsDocumentErrors(data)
    );
  }, [data]);

  return {
    missingIdentityDocumentsErrors,
    missingVehiclesDocumentsErrors,
    missingContractsDocumentsErrors,
  };
}
