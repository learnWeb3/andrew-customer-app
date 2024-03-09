import Radio from "@mui/material/Radio";
import { RadioGroup as MUIRadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export interface RadioGroupProps {
  label: string;
  selectedOptionId: string;
  options: { label: string; value: string | number }[];
  onChange: (newSelectedOptionId: string) => void;
}

export default function RadioGroup({
  label = "",
  selectedOptionId = "",
  options = [
    {
      label: "female",
      value: "female",
    },
    {
      label: "male",
      value: "male",
    },
    {
      label: "other",
      value: "other",
    },
  ],
  onChange = (newSelectedOptionId) => {},
}: RadioGroupProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange((event.target as HTMLInputElement).value);
  }
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MUIRadioGroup row value={selectedOptionId} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MUIRadioGroup>
    </FormControl>
  );
}
