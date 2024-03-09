import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { VehicleInformations } from "../../components/VehicleInformations";
import { findContractVehicles } from "../../services/andrew-api.service";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { PaginatedResults } from "../../lib/paginated-results.interface";
import { Vehicle } from "../../lib/vehicle.interface";

export interface VehiclesDetailProps {
  contract: string;
}
export function VehiclesDetail({ contract }: VehiclesDetailProps) {
  const [vehicles, setVehicles] = useState<PaginatedResults<Vehicle>>({
    start: 0,
    limit: 10,
    results: [],
    count: 0,
  });
  const { accessToken } = useOidcAccessToken();
  useEffect(() => {
    if (contract && accessToken) {
      findContractVehicles(contract, accessToken).then((data) => {
        setVehicles(data);
      });
    }
  }, [contract, accessToken]);
  return (
    <Grid container item xs={12} spacing={4} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Vehicles ({vehicles.results.length})
        </Typography>
      </Grid>

      {vehicles?.results.map((vehicle, index) => (
        <VehicleInformations
          key={index}
          readOnly={true}
          label={`Vehicle n°${index + 1}`}
          vehicle={vehicle}
        />
      ))}
    </Grid>
  );
}
