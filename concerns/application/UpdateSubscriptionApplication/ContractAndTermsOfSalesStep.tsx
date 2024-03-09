import { Grid } from "@mui/material";
import { UpdateSubscriptionApplicationData } from ".";
import { TermOfSales } from "../../../components/TermsOfSale";
import { ObjectStorageFileField } from "../../../components/ObjectStorageFileField";
import { FileType } from "../../../lib/file-type.enum";
import { ContractDownloadField } from "../ContractDownloadField";

export interface ContractAndTermsOfSalesStepProps {
  data: UpdateSubscriptionApplicationData;
  errors: { [field: string]: string[] };
  setErrors: (
    errors:
      | { [field: string]: string[] }
      | ((errors: { [field: string]: string[] }) => {
          [field: string]: string[];
        })
  ) => void;
  setData: (newData: any) => void;
  save: (data: UpdateSubscriptionApplicationData) => Promise<void>;
  readOnly?: boolean;
}
export function ContractAndTermsOfSalesStep({
  data,
  setData = (newData: UpdateSubscriptionApplicationData) => {},
  save = async (data: UpdateSubscriptionApplicationData) => {},
  errors = {},
  setErrors = (errors = {}) => {},
  readOnly = false,
}: ContractAndTermsOfSalesStepProps) {
  async function handleContractFilePathChange(filePath: string) {
    // console.log(filePath);
    const contract = {
      ...data.contract,
      contractDocURL: filePath,
    };
    await save({
      ...data,
      contract,
    });
    setData(() => ({
      ...data,
      contract,
    }));
  }
  return (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <TermOfSales />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
      >
        <ContractDownloadField />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
      >
        <ObjectStorageFileField
          label="Signed contract"
          fileType={FileType.CONTRACT}
          filePath={data?.contract?.contractDocURL || ""}
          onFilePathChange={handleContractFilePathChange}
          fileNameOverride={"contract"}
          readOnly={readOnly}
        />
      </Grid>
    </Grid>
  );
}
