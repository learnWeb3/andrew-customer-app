import { useState, useEffect } from "react";
import { UpdateSubscriptionApplicationData } from ".";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { listProducts } from "../../../services/ecommerce-api.service";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PaginatedResults } from "../../../lib/paginated-results.interface";
import { Logo } from "../../../icons/Logo";
import { Paper } from "@mui/material";

export interface InsuranceProductChoiceStepProps {
  data: UpdateSubscriptionApplicationData;
  setData: (newData: any) => void;
  errors: { [field: string]: string[] };
  setErrors: (
    errors:
      | { [field: string]: string[] }
      | ((errors: { [field: string]: string[] }) => {
          [field: string]: string[];
        })
  ) => void;
  save: (data: UpdateSubscriptionApplicationData) => Promise<void>;
  readOnly?: boolean;
}

export interface InsuranceProductCardProps {
  id: string;
  name: string;
  price: number;
  currencyCode?: string;
  selected?: boolean;
  onSelect: (selectedProductId: string) => void;
  readOnly?: boolean;
}

export default function InsuranceProductCard({
  id = "",
  name = "",
  price = 0,
  currencyCode = "EUR",
  selected = false,
  onSelect = (selectedProductId: string) => {},
  readOnly = false,
}: InsuranceProductCardProps) {
  return (
    <Paper
      sx={{
        p: 1,
        width: "max-content",
        borderColor: selected ? `primary.main` : "secondary.light",
        borderWidth: selected ? `1px` : "unset",
        borderStyle: "solid",
        borderRadius: "4px",
      }}
      elevation={2}
    >
      <Paper sx={{ width: 320 }} elevation={0}>
        <CardMedia
          component="div"
          sx={{
            backgroundColor: "primary.main",
            height: 130,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo height="2.5rem" />
        </CardMedia>
        <CardContent sx={{ padding: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 2 }}>
            <Typography variant="button">Price:</Typography>
            <Typography variant="button">
              {price} {currencyCode} / vehicle
            </Typography>
          </div>
          {!readOnly ? (
            <Button
              size="small"
              onClick={selected ? () => onSelect("") : () => onSelect(id)}
            >
              {selected ? "UNSELECT" : "SELECT"}
            </Button>
          ) : (
            false
          )}
        </CardActions>
      </Paper>
    </Paper>
  );
}
export function InsuranceProductChoiceStep({
  data,
  setData = (newData: UpdateSubscriptionApplicationData) => {},
  errors = {},
  setErrors = (errors = {}) => {},
  save = async (data: UpdateSubscriptionApplicationData) => {},
  readOnly = false,
}: InsuranceProductChoiceStepProps) {
  const { accessToken } = useOidcAccessToken();
  const [insuranceProducts, setInsuranceProducts] = useState<
    PaginatedResults<any>
  >({
    count: 0,
    limit: 10,
    start: 0,
    results: [],
  });

  useEffect(() => {
    if (accessToken && !insuranceProducts.results.length) {
      listProducts(accessToken).then((data) => {
        setInsuranceProducts(data);
      });
    }
  }, [accessToken]);

  function handleSelect(selectedProductId: string) {
    setData({
      ...data,
      contract: {
        ...data.contract,
        ecommerceProduct: selectedProductId,
      },
    });
  }

  return insuranceProducts.results.map((insuranceProduct) => (
    <InsuranceProductCard
      key={insuranceProduct._id}
      id={insuranceProduct._id}
      name={insuranceProduct.name}
      price={insuranceProduct.price}
      onSelect={handleSelect}
      selected={data?.contract?.ecommerceProduct === insuranceProduct._id}
      readOnly={readOnly}
    />
  ));
}
