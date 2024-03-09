import RadioGroup from "../../components/RadioGroup";
import { ContractStatus } from "../../lib/contract-status.enum";

export interface ContractStatusFiltersProps {
  selectedContractStatus: ContractStatus.ACTIVE;
  setSelectedContractStatus: (contractStatus: ContractStatus) => void;
}
export function ContractStatusFilters({
  selectedContractStatus = ContractStatus.ACTIVE,
  setSelectedContractStatus = (contractStatus: ContractStatus) => {},
}) {
  const options = [
    { label: "Active", value: ContractStatus.ACTIVE },
    { label: "Canceled", value: ContractStatus.CANCELED },
    { label: "Inactive", value: ContractStatus.INACTIVE },
    {
      label: "Payment pending",
      value: ContractStatus.PAYMENT_PENDING,
    },
    {
      label: "Payment renewal error",
      value: ContractStatus.PAYMENT_RENEWAL_ERROR,
    },
  ];
  return (
    <RadioGroup
      label={"Filter by status"}
      selectedOptionId={selectedContractStatus}
      options={options}
      onChange={(newSelectedOptionId) =>
        setSelectedContractStatus(newSelectedOptionId as ContractStatus)
      }
    />
  );
}
