import { CheckCircleOutline } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { ContractStatus } from "../../lib/contract-status.enum";

export interface AlertStatusProps {
  status: ContractStatus | null;
}

export function AlertStatus({ status }: AlertStatusProps) {
  return (
    <>
      {status === ContractStatus.ACTIVE ? (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          Your Insurance Contract is currently active.
        </Alert>
      ) : false}
      {status === ContractStatus.CANCELED ? (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          Our teams are reviewing your application, it can takes up to 2-5
          business days.
        </Alert>
      ) : false}
      {status === ContractStatus.INACTIVE ? (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          It seems that your Insurance Contract has been canceled.
        </Alert>
      ) : false}

      {status === ContractStatus.PAYMENT_PENDING ? (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          Our teams are currently awaiting payment for the contract. Please
          proceed to checkout using the payment URL provided. Thank you.
        </Alert>
      ) : false}

      {status === ContractStatus.PAYMENT_RENEWAL_ERROR ? (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          It appears that there is an error with the payment renewal process.
          Please double-check the payment details and try again. If the issue
          persists, feel free to contact our support team for further
          assistance. Thank you.
        </Alert>
      ) : false}
    </>
  );
}
