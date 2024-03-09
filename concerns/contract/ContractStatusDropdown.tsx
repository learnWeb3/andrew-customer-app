import { Chip } from "@mui/material";
import DropDown from "../../components/DropDown";
import { ContractStatus } from "../../lib/contract-status.enum";

export interface ContractStatusDropdownProps {
  activeItemId: ContractStatus;
}

export function ContractStatusDropdown({
  activeItemId,
}: ContractStatusDropdownProps) {
  return (
    <DropDown
      activeItemId={activeItemId}
      items={[
        {
          id: ContractStatus.ACTIVE,
          props: {
            label: "Active",
            color: "success",
          },
          handleClick: () => {},
        },
        {
          id: ContractStatus.INACTIVE,
          props: {
            label: "Inactive",
            color: "primary",
          },
          handleClick: () => {},
        },

        {
          id: ContractStatus.PAYMENT_PENDING,
          props: {
            label: "Payment pending",
            color: "warning",
          },
          handleClick: () => {},
        },
        {
          id: ContractStatus.PAYMENT_RENEWAL_ERROR,
          props: {
            label: "Payment renewal error",
            color: "error",
          },
          handleClick: () => {},
        },
        {
          id: ContractStatus.CANCELED,
          props: {
            label: "Canceled",
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
  );
}
