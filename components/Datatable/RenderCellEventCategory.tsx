import { GridRenderCellParams } from "@mui/x-data-grid";
import { Badge, Box } from "@mui/material";
import { EventCategory } from "../../lib/event-category.enum";

export function RenderCellEventCategory({
  hasFocus,
  value,
}: GridRenderCellParams<any, EventCategory>) {
  return (
    <Box>
      <Badge
        badgeContent={
          value === EventCategory.CONNECTION_LOST
            ? "Connection lost"
            : value === EventCategory.UNTHETHER
            ? "Untether"
            : ""
        }
        color="info"
      />
    </Box>
  );
}
