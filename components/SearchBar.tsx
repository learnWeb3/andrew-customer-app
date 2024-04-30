import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";

export interface SearchBarProps {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
}

export function SearchBar({
  label = "Search users",
  value = "",
  setValue = () => {},
}: SearchBarProps) {
  return (
    <Grid
      container
      spacing={0}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <TextField
            fullWidth={true}
            label={label}
            variant="outlined"
            onInput={(event: any) => setValue(event.target.value)}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
