import { GridRenderCellParams } from "@mui/x-data-grid";
import { DriverBehaviourClass } from "../../lib/driver-behaviour-class.enum";
import { Badge, Box } from "@mui/material";

export function RenderCellBehaviourClass({
  hasFocus,
  value,
}: GridRenderCellParams<any, DriverBehaviourClass>) {
  return (
    <Box>
      {[
        DriverBehaviourClass.A,
        DriverBehaviourClass.B,
        DriverBehaviourClass.C,
      ].includes(value as DriverBehaviourClass) ? (
        <Badge badgeContent={value} color="success" />
      ) : [
          DriverBehaviourClass.D,
          DriverBehaviourClass.E,
          DriverBehaviourClass.F,
          DriverBehaviourClass.G,
          DriverBehaviourClass.H,
          DriverBehaviourClass.I,
        ].includes(value as DriverBehaviourClass) ? (
        <Badge badgeContent={value} color="warning" />
      ) : [DriverBehaviourClass.J, DriverBehaviourClass.K].includes(
          value as DriverBehaviourClass
        ) ? (
        <Badge badgeContent={value} color="error" />
      ) : false}
    </Box>
  );
}
