import { useEffect, useState } from "react";
import { FileType } from "../lib/file-type.enum";
import {
  generateUploadPresignedURL,
  uploadFileToObjectStorage,
} from "../services/andrew-api.service";
import { pause } from "../lib/pause.helper";

export function useFileUploader(
  accessToken: string,
  file: File | null,
  fileType: FileType | null
) {
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [presignedURLData, setPresignedURLData] = useState<{
    url: string;
    expires: number;
    fileName: string;
    fileKey: FileType;
  } | null>(null);

  async function getUploadPresignedURL(
    accessToken: string,
    file: File | null,
    fileType: FileType | null
  ) {
    if (accessToken && file && fileType) {
      setUploading(true);
      const data = await generateUploadPresignedURL(accessToken, {
        fileKey: fileType,
        fileName: file.name,
        mimetype: file.type,
      });
      setPresignedURLData(data);
    }
  }

  async function uploadData(
    presignedURLData: {
      url: string;
      expires: number;
      fileName: string;
      fileKey: FileType;
    } | null,
    file: File | null
  ) {
    if (presignedURLData?.url && file) {
      await uploadFileToObjectStorage(presignedURLData.url, file);
      await pause(5000);
      setUploaded(true);
      setUploading(false);
    }
  }

  useEffect(() => {
    getUploadPresignedURL(accessToken, file, fileType);
  }, [accessToken, file, fileType]);

  useEffect(() => {
    uploadData(presignedURLData, file);
  }, [presignedURLData]);

  return { presignedURLData, uploaded, uploading };
}
