import { GridRenderCellParams } from "@mui/x-data-grid";
import { parseDateString } from "../../services/date-formatter.service";

export function RenderCellDate({
  hasFocus,
  value,
}: GridRenderCellParams<any, string>) {
  return parseDateString(value as string);
}
