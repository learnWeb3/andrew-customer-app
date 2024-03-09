import { Box, Typography } from "@mui/material";

export interface StepTitleProps {
  title: string;
  number: number;
}

export function StepTitle({ title = "", number = 1 }: StepTitleProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      gap={1}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          backgroundColor: "primary.main",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "secondary.main",
        }}
      >
        <Typography component="h2" variant="body2">
          {number}
        </Typography>
      </Box>
      <Typography
        component="h2"
        variant="body1"
        sx={{
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
