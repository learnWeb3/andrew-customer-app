import { AddOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export interface NewButtonProps {
  onClick?: () => void;
}

export function NewButton({ onClick = () => {} }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<AddOutlined />}>
      Create
    </Button>
  );
}
