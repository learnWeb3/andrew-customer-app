import { Grid, Typography } from "@mui/material";
import { VehicleInformations } from "../../components/VehicleInformations";

export interface VehiclesDetailProps {
  vehicles: {
    vin: string;
    brand: string;
    model: string;
    year: number;
    registrationNumber: string;
    originalInServiceDate: string;
    contractSubscriptionKm: number;
    driverLicenceDocURL: string;
    vehicleRegistrationCardDocURL: string;
  }[];
  setVehicles: (
    updatedVehicles: {
      vin: string;
      brand: string;
      model: string;
      year: number;
      registrationNumber: string;
      originalInServiceDate: string;
      contractSubscriptionKm: number;
      driverLicenceDocURL: string;
      vehicleRegistrationCardDocURL: string;
    }[]
  ) => void;
  readonly: boolean;
}
export function VehiclesDetail({
  readonly = false,
  vehicles = [],
  setVehicles = (updatedVehicles) => {},
}: VehiclesDetailProps) {
  return (
    <Grid container item xs={12} spacing={4} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Vehicles ({vehicles.length})
        </Typography>
      </Grid>

      {vehicles.map((vehicle, index) => (
        <VehicleInformations
          key={index}
          readOnly={true}
          vehicle={vehicle}
          label={`Vehicle n°${index + 1}`}
        />
      ))}
    </Grid>
  );
}
