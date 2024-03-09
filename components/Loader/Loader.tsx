import { CircularProgress } from "@mui/material";
import { CircularProgressProps } from "@mui/material";

export function Loader(props: CircularProgressProps) {
  return <CircularProgress {...props} />;
}
