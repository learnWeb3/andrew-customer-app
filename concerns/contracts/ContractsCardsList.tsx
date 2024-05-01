import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button, CardHeader, Paper } from "@mui/material";
import { parseDateString } from "../../services/date-formatter.service";
import { ContractStatus } from "../../lib/contract-status.enum";
import { RenderCellContractSatus } from "../../components/Datatable/RenderCellStatus";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export interface ContractCardProps {
  id: string;
  reference: {
    label: string;
    href: string;
  };
  status: ContractStatus;
  vehicle: {
    label: string;
    href: string;
  };
  createdAt: string;
}

export function ContractCard({
  id,
  reference,
  vehicle,
  status,
  createdAt,
}: ContractCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={<DescriptionOutlinedIcon color="inherit" />}
        title={
          <Typography variant="subtitle2">
            {parseDateString(createdAt)}
          </Typography>
        }
        action={<RenderCellContractSatus value={status} />}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Ref: {reference?.label}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={reference?.href || ""}>
          <Button component={"button"}>See details</Button>
        </Link>
        <Link href={vehicle?.href || ""}>
          <Button component={"button"}>See {vehicle.label} vehicle</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export interface ContractsCardsListProps {
  rows: ContractCardProps[];
}

export function ContractsCardsList({ rows = [] }: ContractsCardsListProps) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      {rows.map((row) => (
        <ContractCard
          key={row.id}
          id={row.id}
          reference={row.reference}
          vehicle={row.vehicle}
          status={row.status}
          createdAt={row.createdAt}
        />
      ))}
      {!rows?.length ? (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            minHeight: "50vh",
          }}
        >
          <CreateOutlinedIcon sx={{ fontSize: "3rem" }} />
          <Typography>No data just yet...</Typography>
        </Paper>
      ) : (
        false
      )}
    </Box>
  );
}
