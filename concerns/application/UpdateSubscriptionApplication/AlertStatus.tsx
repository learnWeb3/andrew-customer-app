import { CheckCircleOutline } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { ApplicationStatus } from "../../../lib/application-status.enum";

export interface AlertStatusProps {
  status: ApplicationStatus | null;
  statusHistory?: {
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
    comment: string;
  }[];
}

export function AlertStatus({ status, statusHistory = [] }: AlertStatusProps) {
  return (
    <>
      {status === ApplicationStatus.PENDING ? (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          Please fill out the form below, when ready, submit your application
          for review, this process can take up to 2-5 business days
        </Alert>
      ) : false}
      {status === ApplicationStatus.REVIEWING ? (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          Our teams are reviewing your application, it can takes up to 2-5
          business days.
        </Alert>
      ) : false}
      {status === ApplicationStatus.PAYMENT_PENDING ? (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
        >
          We are awaiting the confirmation of your payment, please proceed to
          checkout using the link below
        </Alert>
      ) : false}
      {status === ApplicationStatus.PAYMENT_CONFIRMED ? (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
        >
          Congrats, You payment has been confirmed, welcome to the Andrew family
          !
        </Alert>
      ) : false}
      {status === ApplicationStatus.TO_AMMEND ? (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="warning"
        >
          It seems there is an issue with you application please review and
          proceed to necessary changes before re-submitting it for review
          <br />
          <strong>
            Reason:{" "}
            {statusHistory?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )?.[0]?.comment || ""}
          </strong>
        </Alert>
      ) : false}
      {status === ApplicationStatus.REJECTED ? (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="error"
        >
          We are sorry, but it seems you are not elligible for our insurance
          product
          <br />
          <strong>
            Reason:{" "}
            {statusHistory?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )?.[0]?.comment || ""}
          </strong>
        </Alert>
      ) : false}
    </>
  );
}
