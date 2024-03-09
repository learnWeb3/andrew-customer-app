import { Alert, AlertTitle } from "@mui/material";
import { UpdateSubscriptionApplicationData } from ".";

export interface MissingInsuranceProductErrorsProps {
  data: UpdateSubscriptionApplicationData;
}

export function MissingInsuranceProductErrors({
  data,
}: MissingInsuranceProductErrorsProps) {
  return !data?.contract?.ecommerceProduct ? (
    <Alert severity="error">
      <AlertTitle>An insurance product must be selected</AlertTitle>
      <ul>
        <li>
          There isn't any insurance product attached to the application, please
          select an insurance product in the appropriate form section
        </li>
      </ul>
    </Alert>
  ) : null;
}
