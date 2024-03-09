import { Box } from "@mui/material";
import { PropsWithChildren, ReactElement, ReactNode } from "react";

export interface FullScreenContainerProps extends PropsWithChildren {
  alignContent?: string;
}

export function FullScreenContainer({
  children,
  alignContent = "center",
}: FullScreenContainerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: alignContent,
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
}
