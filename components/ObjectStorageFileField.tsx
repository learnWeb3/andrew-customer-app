import { useEffect, useState } from "react";
import { FileType } from "../lib/file-type.enum";
import { useFileUploader } from "../hooks/useFileUploader";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { useFileDownloader } from "../hooks/useFileDownloader";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Link as MUILink } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { Loader } from "./Loader/Loader";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export interface ObjectStorageFileFieldProps {
  label: string;
  filePath: string;
  fileType: FileType | null;
  onFilePathChange: (filePath: string) => void;
  fileNameOverride: string | null;
  readOnly?: boolean;
}

export function ObjectStorageFileField({
  filePath = "",
  label = "",
  fileType = null,
  onFilePathChange = (filePath) => {},
  fileNameOverride = null,
  readOnly = false,
}: ObjectStorageFileFieldProps) {
  const { accessToken } = useOidcAccessToken();
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const { presignedURLData, uploaded, uploading } = useFileUploader(
    accessToken,
    uploadFile,
    fileType
  );

  const downloadFile = useFileDownloader(accessToken, filePath, fileType);

  function handleDownloadFile() {
    if (downloadFile) {
      const objectURL = URL.createObjectURL(downloadFile);
      const link = document.createElement("a");
      link.href = objectURL;
      link.download = fileNameOverride || downloadFile.name;
      link.click();
      URL.revokeObjectURL(objectURL);
    }
  }

  useEffect(() => {
    if (presignedURLData && uploaded) {
      onFilePathChange(
        presignedURLData.fileKey + "/" + presignedURLData.fileName
      );
    }
  }, [presignedURLData, uploaded]);

  function handleChange(event: any) {
    setUploadFile(event.target.files[0]);
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        height: "max-content",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={1}
      >
        <Box display={"flex"} gap={2}>
          <DescriptionIcon />
          <Typography component={"h2"} variant="subtitle2">
            Document - {label.toUpperCase()}
          </Typography>
        </Box>
        {uploading ? <Loader size={"1.25rem"} /> : false}
      </Box>
      {!readOnly ? (
        <Button
          component="label"
          variant={uploading ? "text" : "outlined"}
          color={
            uploading
              ? "primary"
              : uploadFile || downloadFile
              ? "success"
              : "error"
          }
          startIcon={<CloudUploadIcon />}
        >
          {uploading ? "Uploading..." : label}
          <VisuallyHiddenInput type="file" onChange={handleChange} />
        </Button>
      ) : false}
      {!readOnly ? (
        <Typography component={"p"} variant="body2">
          Once uploaded your document will be accessible using a link below
        </Typography>
      ) : false}

      {downloadFile ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={1}
          sx={{ cursor: "pointer" }}
          onClick={handleDownloadFile}
        >
          <SaveAltIcon />
          <MUILink
            component={"span"}
            variant="subtitle2"
            underline="hover"
            color="inherit"
            typography={"button"}
          >
            {label}
          </MUILink>
        </Box>
      ) : (
        <Typography component={"p"} variant="button">
          Nothing just yet.
        </Typography>
      )}
    </Paper>
  );
}
