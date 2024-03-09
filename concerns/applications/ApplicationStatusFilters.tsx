import RadioGroup from "../../components/RadioGroup";
import { ApplicationStatus } from "../../lib/application-status.enum";

export interface ApplicationStatusFiltersProps {
  selectedApplicationStatus: ApplicationStatus.PENDING;
  setSelectedApplicationStatus: (contractStatus: ApplicationStatus) => void;
}
export function ApplicationStatusFilters({
  selectedApplicationStatus = ApplicationStatus.PENDING,
  setSelectedApplicationStatus = (contractStatus: ApplicationStatus) => {},
}) {
  const options = [
    { label: "Pending", value: ApplicationStatus.PENDING },
    { label: "To ammend", value: ApplicationStatus.TO_AMMEND },
    { label: "Rejected", value: ApplicationStatus.REJECTED },
    { label: "Reviewing", value: ApplicationStatus.REVIEWING },
    {
      label: "Payment pending",
      value: ApplicationStatus.PAYMENT_PENDING,
    },
    {
      label: "Payment canceled",
      value: ApplicationStatus.PAYMENT_CANCELED,
    },
    {
      label: "Payment confirmed",
      value: ApplicationStatus.PAYMENT_CONFIRMED,
    },
  ];
  return (
    <RadioGroup
      label={"Filter by status"}
      selectedOptionId={selectedApplicationStatus}
      options={options}
      onChange={(newSelectedOptionId) =>
        setSelectedApplicationStatus(newSelectedOptionId as ApplicationStatus)
      }
    />
  );
}
