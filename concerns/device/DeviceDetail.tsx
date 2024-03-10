import { Grid, Typography } from "@mui/material";
import { DateField } from "../../components/DateField";
import { Device } from "../../lib/device.interface";
import { validateRequired } from "../../components/TextField/validators";
import { DeviceStatus } from "../../lib/device-status.enum";
import { TextField } from "../../components/TextField";

export interface DeviceDetailProps {
  device: Device | null;
  label?: string | null;
}

export function DeviceDetail({
  device = null,
  label = null,
}: DeviceDetailProps) {
  return (
    <Grid container item xs={12} spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2" gutterBottom>
          {label || "Device"}
        </Typography>
      </Grid>
      {device?.status === DeviceStatus.PAIRED ? (
        <Grid item xs={12}>
          <DateField
            label="Pairing date"
            value={device.pairingDate}
            validate={validateRequired}
            errors={[]}
            setErrors={() => {}}
            handleInput={() => {}}
          />
        </Grid>
      ) : (
        false
      )}
      {device ? (
        <Grid item xs={12} display={"flex"} alignItems={"flex-start"} gap={2}>
          <TextField
            label="Serial number"
            validate={validateRequired}
            value={device?.serialNumber}
            errors={[]}
            setErrors={() => {}}
            handleInput={() => {}}
          />
        </Grid>
      ) : (
        false
      )}
      {device ? (
        <Grid item xs={12}>
          <DateField
            label="Registration date"
            value={device.createdAt}
            validate={validateRequired}
            errors={[]}
            setErrors={() => {}}
            handleInput={() => {}}
          />
        </Grid>
      ) : (
        false
      )}
    </Grid>
  );
}
