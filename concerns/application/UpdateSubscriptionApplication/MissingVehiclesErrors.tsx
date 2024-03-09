import { Alert, AlertTitle } from "@mui/material";
import { UpdateSubscriptionApplicationData } from ".";

export interface MissingVehiclesErrorsProps {
  data: UpdateSubscriptionApplicationData;
}

export function MissingVehiclesErrors({ data }: MissingVehiclesErrorsProps) {
  return !data?.vehicles?.length ? (
    <Alert severity="error">
      <AlertTitle>At least one vehicles must be present</AlertTitle>
      <ul>
        <li>
          There isn't any vehicle attached to the applications, please add a
          vehicle and fill out the corresponding informations
        </li>
      </ul>
    </Alert>
  ) : null;
}
