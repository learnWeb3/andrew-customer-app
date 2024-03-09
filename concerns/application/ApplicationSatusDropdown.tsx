import DropDown from "../../components/DropDown";
import { Chip } from "@mui/material";
import { ApplicationStatus } from "../../lib/application-status.enum";

export interface ApplicationStatusDropdownProps {
  activeItemId: ApplicationStatus | null;
}
export function ApplicationStatusDropdown({
  activeItemId = ApplicationStatus.PAYMENT_CONFIRMED,
}: ApplicationStatusDropdownProps) {
  return activeItemId ? (
    <DropDown
      activeItemId={activeItemId as string}
      items={[
        {
          id: ApplicationStatus.PENDING,
          props: {
            label: "Pending",
            color: "info",
          },
          handleClick: () => {},
        },
        {
          id: ApplicationStatus.REVIEWING,
          props: {
            label: "Reviewing",
            color: "info",
          },
          handleClick: () => {},
        },

        {
          id: ApplicationStatus.PAYMENT_PENDING,
          props: {
            label: "Payment pending",
            color: "info",
          },
          handleClick: () => {},
        },
        {
          id: ApplicationStatus.PAYMENT_CONFIRMED,
          props: {
            label: "Payment confirmed",
            color: "success",
          },
          handleClick: () => {},
        },

        {
          id: ApplicationStatus.PAYMENT_CANCELED,
          props: {
            label: "Payment canceled",
            color: "error",
          },
          handleClick: () => {},
        },
        {
          id: ApplicationStatus.TO_AMMEND,
          props: {
            label: "To ammend",
            color: "warning",
          },
          handleClick: () => {},
        },
        {
          id: ApplicationStatus.REJECTED,
          props: {
            label: "Rejected",
            color: "error",
          },
          handleClick: () => {},
        },
      ]}
      Component={(props) => (
        <Chip
          sx={{
            width: "100%",
          }}
          {...props}
        />
      )}
    />
  ) : null;
}
