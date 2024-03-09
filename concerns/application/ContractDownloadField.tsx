import { Box, Paper, Typography } from "@mui/material";
import { GridSaveAltIcon } from "@mui/x-data-grid";
import { Link as MUILink } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export function ContractDownloadField() {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={1}
      >
        <DescriptionIcon />
        <Typography component={"h2"} variant="subtitle2">
          Document - {"Contract blueprint".toUpperCase()}
        </Typography>
      </Box>
      <Typography component={"p"} variant="body2">
        Download and sign the contract before uploading it
      </Typography>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={1}
        sx={{ cursor: "pointer" }}
        // onClick={handleDownloadFile}
      >
        <GridSaveAltIcon />
        <MUILink
          component={"span"}
          variant="subtitle2"
          underline="hover"
          color="inherit"
          typography={"button"}
        >
          Download contract blueprint
        </MUILink>
      </Box>
    </Paper>
  );
}
