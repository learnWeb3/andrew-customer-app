import { GridRenderCellParams } from "@mui/x-data-grid";
import { UserStatus } from "../../lib/user-status.enum";
import { ContractStatus } from "../../lib/contract-status.enum";
import { DeviceStatus } from "../../lib/device-status.enum";
import { ApplicationStatus } from "../../lib/application-status.enum";
import { Chip, Box } from "@mui/material";

export function RenderCellUserSatus({
  hasFocus,
  value,
}:
  | GridRenderCellParams<any, UserStatus>
  | { value: UserStatus; hasFocus?: boolean }) {
  return (
    <Box>
      {value === UserStatus.ACTIVE ? (
        <Chip label={"Active"} color="success" />
      ) : value === UserStatus.INACTIVE ? (
        <Chip label={"Inactive"} color="info" />
      ) : value === UserStatus.DISABLED ? (
        <Chip label={"Disabled"} color="error" />
      ) : (
        false
      )}
    </Box>
  );
}

export function RenderCellContractSatus({
  hasFocus,
  value,
}:
  | GridRenderCellParams<any, ContractStatus>
  | { value: ContractStatus; hasFocus?: boolean }) {
  return value === ContractStatus.ACTIVE ? (
    <Chip label={"Active"} color="success" />
  ) : value === ContractStatus.INACTIVE ? (
    <Chip label={"Inactive"} color="info" />
  ) : value === ContractStatus.PAYMENT_PENDING ? (
    <Chip label={"Payment pending"} color="warning" />
  ) : value === ContractStatus.PAYMENT_RENEWAL_ERROR ? (
    <Chip label={"Payment renewal error"} color="error" />
  ) : value === ContractStatus.CANCELED ? (
    <Chip label={"Canceled"} color="error" />
  ) : (
    false
  );
}

export function RenderCellApplicationSatus({
  hasFocus,
  value,
}:
  | GridRenderCellParams<any, ApplicationStatus>
  | { value: ApplicationStatus; hasFocus?: boolean }) {
  return value === ApplicationStatus.PENDING ? (
    <Chip label={"Pending"} color="info" />
  ) : value === ApplicationStatus.REVIEWING ? (
    <Chip label={"Reviewing"} color={"info"} />
  ) : value === ApplicationStatus.PAYMENT_PENDING ? (
    <Chip label={"Payment pending"} color="info" />
  ) : value === ApplicationStatus.PAYMENT_CONFIRMED ? (
    <Chip label={"Payment confirmed"} color="success" />
  ) : value === ApplicationStatus.PAYMENT_CANCELED ? (
    <Chip label={"Payment canceled"} color="error" />
  ) : value === ApplicationStatus.TO_AMMEND ? (
    <Chip label={"To ammend"} color="warning" />
  ) : value === ApplicationStatus.REJECTED ? (
    <Chip label={"Rejected"} color="error" />
  ) : (
    false
  );
}

export function RenderCellDeviceSatus({
  hasFocus,
  value,
}:
  | GridRenderCellParams<any, DeviceStatus>
  | { value: DeviceStatus; hasFocus?: boolean }) {
  return value === DeviceStatus.DISABLED ? (
    <Chip label={"Disabled"} color="error" />
  ) : value === DeviceStatus.PAIRED ? (
    <Chip label={"Paired"} color="success" />
  ) : value === DeviceStatus.INACTIVE ? (
    <Chip label={"Inactive"} color="info" />
  ) : (
    false
  );
}

export function RenderCellBehaviourClassSatus({
  hasFocus,
  value,
}:
  | GridRenderCellParams<any, "A" | "B" | "C" | "D" | "E" | "F">
  | { value: "A" | "B" | "C" | "D" | "E" | "F"; hasFocus?: boolean }) {
  return (
    <Box>
      {value === "A" ? (
        <Chip label={"A"} color="success" />
      ) : value === "B" ? (
        <Chip label={"B"} color="success" />
      ) : value === "C" ? (
        <Chip label={"C"} color="warning" />
      ) : value === "D" ? (
        <Chip label={"D"} color="warning" />
      ) : value === "E" ? (
        <Chip label={"E"} color="error" />
      ) : value === "F" ? (
        <Chip label={"F"} color="error" />
      ) : (
        <Chip label={"N/A"} color="secondary" />
      )}
    </Box>
  );
}
