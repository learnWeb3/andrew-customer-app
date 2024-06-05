import {
  FormControl,
  FormHelperText,
  TextField as MUITextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export interface TextFieldProps {
  label?: string;
  helpertext?: string;
  value?: string;
  handleInput?: (value: any) => void;
  setErrors: (errors: string[]) => void;
  errors: string[];
  validate: (value: any, options: { label: string }) => string[];
  readOnly?: boolean;
  id?: string;
  placeholder?: string;
}
export function TextField({
  label = "",
  helpertext = "",
  value = "",
  readOnly = false,
  id = "",
  placeholder = "",
  handleInput = (value: string) => {
    console.log(value);
  },
  setErrors = (errors: string[]) => {},
  errors = [],
  validate = (value: any, options: { label: string }): string[] => {
    console.log(value);
    return [];
  },
}: TextFieldProps) {
  useEffect(() => {
    const _errors = validate(value, { label });
    setErrors(_errors);
  }, [value]);

  return (
    <FormControl fullWidth={true}>
      <MUITextField
        label={label}
        error={errors?.length > 0}
        onInput={(event: any) => handleInput(event?.target?.value)}
        value={value}
        helperText={errors?.length ? errors.join(", ") : ""}
        inputProps={{ readOnly }}
        placeholder={placeholder}
      />
      {helpertext ? <FormHelperText>Required</FormHelperText> : false}
    </FormControl>
  );
}
