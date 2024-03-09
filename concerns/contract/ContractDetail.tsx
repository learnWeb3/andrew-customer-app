import { FormControl, Grid, Typography } from "@mui/material";
import { DateField } from "../../components/DateField";
import { Contract } from "../../lib/contract.interface";

export interface ContractDetailProps {
  contract: Contract;
}

export function ContractDetail({ contract }: ContractDetailProps) {
  return (
    <Grid container item xs={12} spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Contract
        </Typography>
      </Grid>

      <Grid container item xs={12} lg={6} spacing={4} alignItems="flex-start">
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <DateField label="Creation date" value={contract.createdAt} />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}
