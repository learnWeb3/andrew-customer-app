import { GridRenderCellParams } from "@mui/x-data-grid";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";

export function RenderCellLink({
  hasFocus,
  value,
}: GridRenderCellParams<any, { label: string; href: string }>) {
  return (
    <Link href={value?.href || ""}>
      <MUILink component={"span"} variant="subtitle2">
        {value?.label}
      </MUILink>
    </Link>
  );
}
