import { Button, Grid, Typography } from "@mui/material";
import { UpdateSubscriptionApplicationData } from ".";
import { VehicleInformations } from "../../../components/VehicleInformations";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";

export interface VehiclesInformationsStepProps {
  data: UpdateSubscriptionApplicationData;
  setData: (newData: any) => void;
  readOnly?: boolean;
  save: (data: UpdateSubscriptionApplicationData) => Promise<void>;
  errors: { [field: string]: string[] };
  setErrors: (
    errors:
      | { [field: string]: string[] }
      | ((errors: { [field: string]: string[] }) => {
          [field: string]: string[];
        })
  ) => void;
}
export function VehiclesInformationsStep({
  data,
  setData = (newData: UpdateSubscriptionApplicationData) => {},
  save = async (data: UpdateSubscriptionApplicationData) => {},
  readOnly = false,
  errors = {},
  setErrors = (errors = {}) => {},
}: VehiclesInformationsStepProps) {
  function handleAddNewVehicle() {
    setData({
      ...data,
      vehicles: [
        ...(data?.vehicles?.length ? data.vehicles : []),
        {
          vin: "",
          brand: "",
          model: "",
          year: new Date().getFullYear(),
          registrationNumber: "",
          originalInServiceDate: new Date().toISOString(),
          contractSubscriptionKm: 0,
        },
      ],
    });
  }

  function handleRemoveVehicle(index: number) {
    const vehicles = [...data.vehicles];
    vehicles.splice(index, 1);
    setData({
      ...data,
      vehicles,
    });
  }
  return (
    <Grid container gap={4} alignItems="flex-start">
      <Grid item xs={12} container gap={2} alignItems="flex-start">
        {data?.vehicles?.length ? (
          data.vehicles.map((vehicle, index) => (
            <Grid container gap={2} item xs={12} key={index}>
              <VehicleInformations
                vehicle={vehicle}
                setVehicle={(vehicle) => {
                  const updatedVehicles = [...data.vehicles];
                  updatedVehicles.splice(index, 1, vehicle);
                  setData({
                    ...data,
                    vehicles: updatedVehicles,
                  });
                }}
                readOnly={readOnly}
                label={`Vehicle n°${index + 1}`}
                handleRegistrationCardFilePathChange={async (
                  filePath: string
                ) => {
                  const vehicles = [...data.vehicles];
                  vehicles.splice(index, 1, {
                    ...data.vehicles[index],
                    vehicleRegistrationCardDocURL: filePath,
                  });
                  await save({
                    ...data,
                    vehicles,
                  });
                  setData({
                    ...data,
                    vehicles,
                  });
                }}
                handleDriverLicenseFilePathChange={async (filePath: string) => {
                  const vehicles = [...data.vehicles];
                  vehicles.splice(index, 1, {
                    ...data.vehicles[index],
                    driverLicenceDocURL: filePath,
                  });

                  await save({
                    ...data,
                    vehicles,
                  });
                  setData({
                    ...data,
                    vehicles,
                  });
                }}
                handleVehicleErrors={(vehicleErrors: {
                  vin: string[];
                  brand: string[];
                  model: string[];
                  originalInServiceDate: string[];
                  registrationNumber: string[];
                }) => {
                  const _vehicleErrors = Object.values(vehicleErrors).reduce(
                    (list, _errors: string[]) => {
                      list.push(
                        ..._errors.map(
                          (_error) => `Vehicle ${index + 1}: ${_error}`
                        )
                      );
                      return list;
                    },
                    []
                  );
                  setErrors(() => ({
                    ...errors,
                    [`vehicle-${index}`]: _vehicleErrors,
                  }));
                }}
              />
              {!readOnly ? (
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  gap={2}
                >
                  <Button
                    onClick={() => handleRemoveVehicle(index)}
                    variant="contained"
                    color="error"
                    startIcon={<RemoveIcon />}
                  >
                    Remove vehicle
                  </Button>
                </Grid>
              ) : (
                false
              )}
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No vehicles registered.</Typography>
        )}
      </Grid>
      {!readOnly ? (
        <Grid
          item
          xs={12}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={handleAddNewVehicle}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add new vehicle
          </Button>

          <Button
            disabled={data?.vehicles?.length ? false : true}
            color="primary"
            onClick={() => save(data)}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      ) : (
        false
      )}
    </Grid>
  );
}
