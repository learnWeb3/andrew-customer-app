import axios from "axios";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export interface MapsAutocompleteTextFieldProps {
  label?: string;
  helpertext?: string;
  value?: string;
  handleInput: (value: {
    address: string;
    city: string;
    country: string;
    postCode: string;
  }) => void;
  setErrors: (errors: string[]) => void;
  errors: string[];
  validate: (value: any) => string[];
  readOnly?: boolean;
  id: string;
}

export function MapsAutocompleteTextField(
  props: MapsAutocompleteTextFieldProps
) {
  const [value, setValue] = useState<string>("");
  const [placeId, setPlaceId] = useState<string>("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    {
      label: string;
      id: string;
    }[]
  >([]);
  useEffect(() => {
    if (value.length > 2) {
      axios.post("/api/place-autocomplete", { input: value }).then(({ data }) =>
        setAutocompleteOptions(
          data.components.predictions.map(({ description, place_id }: any) => ({
            label: description,
            id: place_id,
          }))
        )
      );
    }
  }, [value]);

  useEffect(() => {
    if (placeId) {
      axios
        .post("/api/place-details", { input: placeId })
        .then(({ data }) => props.handleInput(data));
    }
  }, [placeId]);
  return (
    <Autocomplete
      disablePortal
      options={autocompleteOptions}
      onInput={(event: any) => setValue(event.target.value)}
      onChange={(event: any) => {
        setValue(autocompleteOptions[event.target.value]?.label || "");
        setPlaceId(autocompleteOptions[event.target.value]?.id || "");
      }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}
