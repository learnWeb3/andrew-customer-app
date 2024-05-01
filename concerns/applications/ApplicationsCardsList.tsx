import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ApplicationStatus } from "../../lib/application-status.enum";
import Link from "next/link";
import { Button, CardHeader, Paper } from "@mui/material";
import { RenderCellApplicationSatus } from "../../components/Datatable/RenderCellStatus";
import { parseDateString } from "../../services/date-formatter.service";
import { UserAvatar } from "../../components/UserAvatar";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

export interface ApplicationCardProps {
  id: string;
  reference: {
    label: string;
    href: string;
  };
  user: {
    label: string;
    href: string;
  };
  status: ApplicationStatus;
  createdAt: string;
}

export function ApplicationCard({
  id,
  reference,
  user,
  status,
  createdAt,
}: ApplicationCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={<UserAvatar fullName={user.label} />}
        title={
          <Typography variant="subtitle2" gutterBottom>
            {parseDateString(createdAt)}
          </Typography>
        }
        action={<RenderCellApplicationSatus value={status} />}
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
      </CardActions>
    </Card>
  );
}

export interface ApplicationsCardsListProps {
  rows: ApplicationCardProps[];
}

export function ApplicationsCardsList({
  rows = [],
}: ApplicationsCardsListProps) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      {rows.map((row) => (
        <ApplicationCard
          key={row.id}
          id={row.id}
          reference={row.reference}
          user={row.user}
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
