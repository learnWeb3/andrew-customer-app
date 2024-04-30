import { Alert, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { DeviceStatus } from "../../lib/device-status.enum";
import { DeviceDetail } from "./DeviceDetail";
import { DeviceStatistics } from "./DeviceStatistics";
import { DeviceStatusDropdown } from "./DeviceStatusDropdown";
import { Device } from "../../lib/device.interface";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { findDevice } from "../../services/andrew-api.service";
import { VehicleInformations } from "../../components/VehicleInformations";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export interface DeviceConcernProps {
  id: string | null;
}

export function DeviceConcern({ id = null }: DeviceConcernProps) {
  const { accessToken } = useOidcAccessToken();
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    if (id && accessToken) {
      findDevice(id, accessToken).then((device: Device) => setDevice(device));
    }
  }, [id, accessToken]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Breadcrumb
          parts={
            device
              ? [
                  {
                    label: "Devices",
                    href: "/devices",
                  },
                  {
                    label: device?.serialNumber as string,
                    href: `/devices/${device?._id}`,
                  },
                ]
              : [
                  {
                    label: "Devices",
                    href: "/devices",
                  },
                ]
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={9}
        sx={{ display: "flex", alignItems: "center", gap: 4 }}
      >
        <Typography variant="h6" component="h2">
          {device?.serialNumber}
        </Typography>

        <DeviceStatusDropdown
          activeItemId={(device?.status as DeviceStatus) || null}
        />
      </Grid>
      {device?.status === DeviceStatus.PAIRED && device?.vehicle?.vin ? (
        <Grid item xs={12}>
          <DeviceStatistics
            vehiclesVIN={[device.vehicle.vin]}
            from={Date.now() - 365 * 2 * 24 * 60 * 60 * 1000}
          />
        </Grid>
      ) : (
        false
      )}

      {device?.status === DeviceStatus.INACTIVE ||
      device?.status === DeviceStatus.DISABLED ? (
        <Grid item xs={12}>
          <Alert
            icon={<ErrorOutlineOutlinedIcon fontSize="inherit" />}
            severity="warning"
          >
            This device does not have a PAIRED status, please pair it to a
            vehicle or re-enable it.
          </Alert>
        </Grid>
      ) : (
        false
      )}
      <Grid item xs={12}>
        <DeviceDetail device={device} />
      </Grid>
      <Grid item xs={12}>
        {device?.status === DeviceStatus.PAIRED ? (
          <VehicleInformations
            readOnly={true}
            vehicle={device.vehicle}
            label="Paired vehicle"
          />
        ) : (
          false
        )}
      </Grid>
    </Grid>
  );
}
