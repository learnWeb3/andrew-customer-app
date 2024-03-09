import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export enum ErrorType {
  UNAUTHORIZED = "UNAUTHORIZED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
}

export interface ErrorProps {
  type?: ErrorType;
}
export function Error({ type = ErrorType.UNAUTHORIZED }) {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          p: 4,
        }}
        gap={2}
      >
        {type === ErrorType.UNAUTHORIZED ? (
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Typography variant="h6">401 Unauthorized</Typography>
            <Typography variant="subtitle1">
              Access Denied: You are not authorized to view this page. Please
              log in with valid credentials.
            </Typography>
          </Box>
        ) : (
          false
        )}
        {type === ErrorType.FORBIDDEN ? (
          <Box display={"flex"} flexDirection={"column"} gap={4}>
            <Typography variant="h6">403 Forbidden</Typography>
            <Typography variant="subtitle1">
              Access Denied: You don't have permission to access this resource.
              Please contact the administrator for assistance.
            </Typography>
          </Box>
        ) : (
          false
        )}
        {type === ErrorType.NOT_FOUND ? (
          <Box display={"flex"} flexDirection={"column"} gap={4}>
            <Typography variant="h6">404 Not Found</Typography>
            <Typography variant="subtitle1">
              Page Not Found: The requested page could not be found on the
              server. Please check the URL and try again.
            </Typography>
          </Box>
        ) : (
          false
        )}
        {type === ErrorType.INTERNAL_SERVER_ERROR ? (
          <Box display={"flex"} flexDirection={"column"} gap={4}>
            <Typography variant="h6">500 Internal Server Error</Typography>
            <Typography variant="subtitle1">
              Something went wrong: The server encountered an unexpected
              condition that prevented it from fulfilling the request. Please
              try again later.
            </Typography>
          </Box>
        ) : (
          false
        )}

        <Box display={"flex"} gap={2}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => router.back()}
            size="small"
            startIcon={<ArrowBackIosOutlinedIcon />}
          >
            Back
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => router.push("/")}
            size="small"
            startIcon={<HomeOutlinedIcon />}
          >
            Home
          </Button>
        </Box>
      </Box>
    </>
  );
}
