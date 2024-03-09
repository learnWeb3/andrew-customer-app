import { useEffect, useState } from "react";
import { FileType } from "../lib/file-type.enum";
import {
  downloadFileFromPresignedURL,
  generateDownloadPresignedURL,
} from "../services/andrew-api.service";

export function useFileDownloader(
  accessToken: string,
  filePath: string,
  fileType: FileType | null
) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (accessToken && filePath && fileType) {
      const fileName = filePath.replace(fileType + "/", "");
      generateDownloadPresignedURL(accessToken, {
        fileKey: fileType,
        fileName,
      })
        .then(async ({ url }) => await downloadFileFromPresignedURL(url))
        .then((blob) => new File([blob], fileName, { type: blob.type }))
        .then((file) => setFile(file));
    }
  }, [accessToken, filePath, fileType]);

  return file;
}
