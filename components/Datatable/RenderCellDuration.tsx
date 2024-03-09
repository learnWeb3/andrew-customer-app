import { GridRenderCellParams } from "@mui/x-data-grid";
import { getDuration } from "../../services/date-formatter.service";

export function RenderCellDuration({
  hasFocus,
  value,
}: GridRenderCellParams<any, number>) {
  return getDuration(value as number, 'millisecond');
}
