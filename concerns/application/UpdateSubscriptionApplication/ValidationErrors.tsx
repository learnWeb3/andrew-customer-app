import { Alert, AlertTitle } from "@mui/material";

export interface ValidationErrorsProps {
  errors: string[];
}

export function ValidationErrors({ errors }: ValidationErrorsProps) {
  return errors?.length ? (
    <Alert severity="error">
      <AlertTitle>Validation errors</AlertTitle>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </Alert>
  ) : null;
}
