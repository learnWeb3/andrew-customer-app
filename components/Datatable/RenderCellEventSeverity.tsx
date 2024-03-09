import { GridRenderCellParams } from "@mui/x-data-grid";
import { Badge, Box } from "@mui/material";
import { EventLevel } from "../../lib/event-level.enum";

export function RenderCellEventSeverity({
  hasFocus,
  value,
}: GridRenderCellParams<any, EventLevel>) {
  return (
    <Box>
      {value === EventLevel.LOW ? (
        <Badge badgeContent={"Active"} color="success" />
      ) : value === EventLevel.MEDIUM ? (
        <Badge badgeContent={"Inactive"} color="warning" />
      ) : value === EventLevel.HIGH ? (
        <Badge badgeContent={"Disabled"} color="error" />
      ) : false}
    </Box>
  );
}
