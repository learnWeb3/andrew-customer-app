import RadioGroup from "../../components/RadioGroup";
import { DeviceStatus } from "../../lib/device-status.enum";

export interface DeviceStatusFiltersProps {
  selectedDeviceStatus: DeviceStatus.PAIRED;
  setSelectedDeviceStatus: (contractStatus: DeviceStatus) => void;
}
export function DeviceStatusFilters({
  selectedDeviceStatus = DeviceStatus.PAIRED,
  setSelectedDeviceStatus = (contractStatus: DeviceStatus) => {},
}) {
  const options = [
    { label: "Paired", value: DeviceStatus.PAIRED },
    { label: "Inactive", value: DeviceStatus.INACTIVE },
    { label: "Disabled", value: DeviceStatus.DISABLED },
  ];
  return (
    <RadioGroup
      label={"Filter by status"}
      selectedOptionId={selectedDeviceStatus}
      options={options}
      onChange={(newSelectedOptionId) =>
        setSelectedDeviceStatus(newSelectedOptionId as DeviceStatus)
      }
    />
  );
}
