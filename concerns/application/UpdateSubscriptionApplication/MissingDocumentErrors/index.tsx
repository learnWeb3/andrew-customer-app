import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { UpdateSubscriptionApplicationData } from "..";
import {
  computeMissingContractsDocumentErrors,
  computeMissingIdentityDocumentErrors,
  computeMissingVehiclesDocumentErrors,
  useMissingDocumentsErrors,
} from "./useMissingDocumentsErrors";

export interface MissingDocumentErrorsProps {
  data: UpdateSubscriptionApplicationData;
}

export function MissingDocumentErrors({ data }: MissingDocumentErrorsProps) {
  const {
    missingIdentityDocumentsErrors,
    missingContractsDocumentsErrors,
    missingVehiclesDocumentsErrors,
  } = useMissingDocumentsErrors(data);

  return (
    <>
      {missingIdentityDocumentsErrors?.length ? (
        <Alert severity="error">
          <AlertTitle>Missing identity documents</AlertTitle>
          <ul>
            {missingIdentityDocumentsErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      ) : false}
      {missingVehiclesDocumentsErrors?.length ? (
        <Alert severity="error">
          <AlertTitle>Missing vehicles documents</AlertTitle>
          <ul>
            {missingVehiclesDocumentsErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      ) : false}
      {missingContractsDocumentsErrors?.length ? (
        <Alert severity="error">
          <AlertTitle>Missing contract documents</AlertTitle>
          <ul>
            {missingContractsDocumentsErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      ) : false}
    </>
  );
}
