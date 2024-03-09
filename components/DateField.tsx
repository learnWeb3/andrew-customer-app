import { FormControl } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";

export interface DateFieldProps {
  label?: string;
  value: string;
  handleInput?: (value: any) => void;
  setErrors?: (errors: string[]) => void;
  errors?: string[];
  validate?: (value: any, options: { label: string }) => string[];
  readOnly?: boolean;
}

export function DateField({
  label = "",
  value = "",
  setErrors = (errors: string[]) => {},
  errors = [],
  handleInput = (value: string) => {
    console.log(value);
  },
  validate = (value: any, options: { label: string }): string[] => {
    console.log(value);
    return [];
  },
}: DateFieldProps) {
  useEffect(() => {
    setErrors(validate(value, { label }));
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth={true}>
        <MobileDatePicker
          label={label}
          defaultValue={dayjs(value)}
          onChange={handleInput}
        />
      </FormControl>
    </LocalizationProvider>
  );
}
