import { Chip } from "@mui/material";
import DropDown from "../../components/DropDown";
import { DeviceStatus } from "../../lib/device-status.enum";

export interface DeviceStatusDropdownProps {
  activeItemId: DeviceStatus | null;
}

export function DeviceStatusDropdown({
  activeItemId = null,
}: DeviceStatusDropdownProps) {
  return activeItemId ? (
    <DropDown
      activeItemId={DeviceStatus.PAIRED}
      items={[
        {
          id: DeviceStatus.PAIRED,
          props: {
            label: "Active",
            color: "success",
          },
          handleClick: () => {},
        },
        {
          id: DeviceStatus.INACTIVE,
          props: {
            label: "Inactive",
            color: "primary",
          },
          handleClick: () => {},
        },

        {
          id: DeviceStatus.DISABLED,
          props: {
            label: "Disabled",
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
