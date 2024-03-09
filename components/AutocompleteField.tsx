import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl, FormHelperText } from "@mui/material";

export interface AutocompleFieldProps {
  options?: string[];
  label?: string;
  helpertext?: string;
}

export default function AutocompleField({
  options = ["Option 1", "Option 2"],
  label = "",
  helpertext = "",
}: AutocompleFieldProps) {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <FormControl fullWidth={true}>
      <Autocomplete
        value={value}
        fullWidth={true}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {helpertext ? <FormHelperText>{helpertext}</FormHelperText> : false}
    </FormControl>
  );
}
