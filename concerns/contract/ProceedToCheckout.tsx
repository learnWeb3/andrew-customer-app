import { Button, Grid } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export interface ProceedToCheckoutProps {
  readOnly?: boolean;
  proceedToCheckout: () => Promise<void>;
}
export function ProceedToCheckout({
  readOnly = false,
  proceedToCheckout = async () => {},
}: ProceedToCheckoutProps) {
  return !readOnly ? (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid
        item
        xs={12}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Button
          startIcon={<CreditCardIcon />}
          onClick={() => proceedToCheckout()}
          variant="contained"
          size="large"
          color="success"
        >
          PROCEED TO CHECKOUT
        </Button>
      </Grid>
    </Grid>
  ) : null;
}
