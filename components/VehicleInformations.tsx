import { Button, Grid, Typography } from "@mui/material";
import { DateField } from "./DateField";
import { TextField } from "./TextField";
import {
  validateRequired,
  validateRequiredNumber,
} from "./TextField/validators";
import { FileType } from "../lib/file-type.enum";
import { ObjectStorageFileField } from "./ObjectStorageFileField";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useVINDecoder } from "../hooks/useVINDecoder";

export interface VehicleInformationsProps {
  label?: string;
  vehicle: {
    vin?: string;
    brand?: string;
    model?: string;
    year?: number;
    registrationNumber?: string;
    originalInServiceDate?: string;
    contractSubscriptionKm?: number;
    driverLicenceDocURL?: string;
    vehicleRegistrationCardDocURL?: string;
  };
  setVehicle?: (vehicle: {
    vin?: string;
    brand?: string;
    model?: string;
    year?: number;
    registrationNumber?: string;
    originalInServiceDate?: string;
    contractSubscriptionKm?: number;
    driverLicenceDocURL?: string;
    vehicleRegistrationCardDocURL?: string;
  }) => void;
  readOnly?: boolean;
  handleRegistrationCardFilePathChange?: (filePath: string) => Promise<void>;
  handleDriverLicenseFilePathChange?: (filePath: string) => Promise<void>;
  handleVehicleErrors?: (errors: {
    vin: string[];
    brand: string[];
    model: string[];
    originalInServiceDate: string[];
    registrationNumber: string[];
  }) => void;
}

export function VehicleInformations({
  label = "",
  vehicle,
  readOnly = false,
  setVehicle = (vehicle) => {},
  handleRegistrationCardFilePathChange = async (filePath: string) => {},
  handleDriverLicenseFilePathChange = async (filePath: string) => {},
  handleVehicleErrors = (errors: {
    vin: string[];
    brand: string[];
    model: string[];
    originalInServiceDate: string[];
    registrationNumber: string[];
  }) => {},
}: VehicleInformationsProps) {
  const [errors, setErrors] = useState<{
    vin: string[];
    brand: string[];
    model: string[];
    originalInServiceDate: string[];
    registrationNumber: string[];
    contractSubscriptionKm: string[];
  }>({
    vin: [],
    brand: [],
    model: [],
    originalInServiceDate: [],
    registrationNumber: [],
    contractSubscriptionKm: [],
  });

  useEffect(() => {
    handleVehicleErrors(errors);
    return () =>
      handleVehicleErrors({
        vin: [],
        brand: [],
        model: [],
        originalInServiceDate: [],
        registrationNumber: [],
      });
  }, [errors]);

  const decodedVIN = useVINDecoder(vehicle.vin || "");

  useEffect(() => {
    if (decodedVIN?.ErrorCode === "0") {
      setVehicle({
        ...vehicle,
        brand: decodedVIN.Make,
        model: decodedVIN.Model,
        originalInServiceDate: new Date(+decodedVIN.ModelYear, 0).toISOString(),
      });
    }
  }, [decodedVIN]);

  return (
    <Grid container item xs={12} spacing={4} mb={2} alignItems="flex-start">
      {label ? (
        <Grid item xs={12}>
          <Typography gutterBottom variant="subtitle2">
            {label}
          </Typography>
        </Grid>
      ) : (
        false
      )}
      <Grid container item xs={12} lg={6} spacing={4} alignItems="flex-start">
        <Grid item xs={12}>
          <TextField
            label="VIN"
            placeholder="WA1A4AFY2J2008189"
            validate={validateRequired}
            value={vehicle?.vin}
            handleInput={(value) => {
              setVehicle({
                ...vehicle,
                vin: value,
              });
            }}
            readOnly={readOnly}
            errors={(errors.vin as any) || []}
            setErrors={(_errors) =>
              setErrors((errors) => ({
                ...errors,
                vin: _errors,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Brand"
            validate={validateRequired}
            value={vehicle?.brand}
            handleInput={(value) => {
              setVehicle({
                ...vehicle,
                brand: value,
              });
            }}
            readOnly={readOnly}
            errors={(errors.brand as any) || []}
            setErrors={(_errors) =>
              setErrors((errors) => ({
                ...errors,
                brand: _errors,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Model"
            validate={validateRequired}
            value={vehicle?.model}
            handleInput={(value) => {
              setVehicle({
                ...vehicle,
                model: value,
              });
            }}
            readOnly={readOnly}
            errors={(errors.model as any) || []}
            setErrors={(_errors) =>
              setErrors((errors) => ({
                ...errors,
                model: _errors,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Registration number"
            validate={validateRequired}
            value={vehicle?.registrationNumber}
            handleInput={(value) => {
              setVehicle({
                ...vehicle,
                registrationNumber: value,
              });
            }}
            readOnly={readOnly}
            errors={(errors.registrationNumber as any) || []}
            setErrors={(_errors) =>
              setErrors((errors) => ({
                ...errors,
                registrationNumber: _errors,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Current vehicle Km"
            validate={validateRequiredNumber}
            value={`${vehicle?.contractSubscriptionKm}` || "0"}
            handleInput={(value) => {
              setVehicle({
                ...vehicle,
                contractSubscriptionKm: +value,
              });
            }}
            readOnly={readOnly}
            errors={(errors.registrationNumber as any) || []}
            setErrors={(_errors) =>
              setErrors((errors) => ({
                ...errors,
                contractSubscriptionKm: _errors,
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <DateField
            label="Original in service date"
            validate={validateRequired}
            value={vehicle?.originalInServiceDate || new Date().toISOString()}
            handleInput={(value: Dayjs) => {
              setVehicle({
                ...vehicle,
                originalInServiceDate: value.toDate().toISOString(),
              });
            }}
            errors={(errors.originalInServiceDate as any) || []}
            setErrors={(_errors) =>
              setErrors((errors) => ({
                ...errors,
                originalInServiceDate: _errors,
              }))
            }
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} lg={6} spacing={4} alignItems="flex-start">
        <Grid item xs={12} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <ObjectStorageFileField
            label="vehicle registration card"
            filePath={vehicle?.vehicleRegistrationCardDocURL || ""}
            onFilePathChange={handleRegistrationCardFilePathChange}
            fileType={FileType.VEHICLE_REGISTRATION_CARD}
            fileNameOverride={"vehicle-registration-card"}
            readOnly={readOnly}
          />

          <ObjectStorageFileField
            label="driver license"
            filePath={vehicle?.driverLicenceDocURL || ""}
            onFilePathChange={handleDriverLicenseFilePathChange}
            fileType={FileType.DRIVER_LICENSE}
            fileNameOverride={"driver-licence"}
            readOnly={readOnly}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
