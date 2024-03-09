import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";

export interface ValidationErrorsProps {
  errors: { [field: string]: string[] };
}

export function ValidationErrors({ errors }: ValidationErrorsProps) {
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  useEffect(() => {
    setGlobalErrors(
      Object.values(errors).reduce((errors, globalList) => {
        globalList.push(...errors);
        return globalList;
      }, [])
    );
  }, [errors]);
  return globalErrors?.length ? (
    <Alert severity="error">
      <AlertTitle>Validation errors</AlertTitle>
      <ul>
        {globalErrors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </Alert>
  ) : null;
}
