import { Button, Grid } from "@mui/material";
import { UpdateSubscriptionApplicationData } from ".";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { ApplicationStatus } from "../../../lib/application-status.enum";
import { useMissingDocumentsErrors } from "./MissingDocumentErrors/useMissingDocumentsErrors";

export interface ChangesValidationStepProps {
  data: UpdateSubscriptionApplicationData;
  errors: string[];
  setData: (newData: any) => void;
  pay: (data: UpdateSubscriptionApplicationData) => Promise<void>;
  save: (data: UpdateSubscriptionApplicationData) => Promise<void>;
  review: (data: UpdateSubscriptionApplicationData) => Promise<void>;
  readOnly?: boolean;
}
export function ChangesValidationStep({
  data,
  setData = (newData: UpdateSubscriptionApplicationData) => {},
  save = async (data: UpdateSubscriptionApplicationData) => {},
  pay = async (data: UpdateSubscriptionApplicationData) => {},
  review = async (data: UpdateSubscriptionApplicationData) => {},
  errors = [],
  readOnly = false,
}: ChangesValidationStepProps) {
  const {
    missingIdentityDocumentsErrors,
    missingContractsDocumentsErrors,
    missingVehiclesDocumentsErrors,
  } = useMissingDocumentsErrors(data);
  return !readOnly ? (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid
        item
        xs={12}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        {data?.status === ApplicationStatus.PENDING ||
        data?.status === ApplicationStatus.TO_AMMEND ? (
          <Button
            startIcon={<VisibilityIcon />}
            onClick={async () => {
              await save(data);
              await review(data);
            }}
            variant="contained"
            disabled={
              errors?.length ||
              missingContractsDocumentsErrors?.length ||
              missingIdentityDocumentsErrors?.length ||
              missingVehiclesDocumentsErrors?.length ||
              !data?.vehicles?.length ||
              !data?.contract?.ecommerceProduct
                ? true
                : false
            }
          >
            Ask for review
          </Button>
        ) : (
          false
        )}

        {data?.status === ApplicationStatus.PAYMENT_PENDING ? (
          <Button
            startIcon={<CreditCardIcon />}
            onClick={() => pay(data)}
            variant="contained"
            size="large"
            color="success"
            disabled={
              errors?.length ||
              missingContractsDocumentsErrors?.length ||
              missingIdentityDocumentsErrors?.length ||
              missingVehiclesDocumentsErrors?.length ||
              !data?.vehicles?.length ||
              !data?.contract?.ecommerceProduct
                ? true
                : false
            }
          >
            Pay
          </Button>
        ) : (
          false
        )}
      </Grid>
    </Grid>
  ) : null;
}
