import { Grid, IconButton, Paper, Typography } from "@mui/material";
import { NotificationType } from "../../lib/notification-type.enum";
import { timeElapsedSince } from "../../services/date-formatter.service";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectNotifications } from "../../store/reducers/notifications.reducer";

export interface NotificationItemProps {
  type: NotificationType;
  id: string | null;
  data: any;
  createdAt: string;
  close?: () => void;
}
export function NotificationItem({
  type,
  data,
  createdAt,
  close = () => {},
  id = null,
}: NotificationItemProps) {
  const router = useRouter();
  let path: string = "";
  function handleClick() {
    const path = `/applications/${data?._id}`;
    router.push(path);
    close();
  }
  const [highLighted, sethighLighted] = useState<boolean>(false);
  const liveNotifications = useAppSelector(selectNotifications);
  useEffect(() => {
    if (liveNotifications?.length && id) {
      sethighLighted(
        liveNotifications.find((notification) => notification._id === id)
          ? true
          : false
      );
    }
  }, [liveNotifications, id]);
  return (
    <Paper
      sx={
        !highLighted
          ? {
              backgroundColor: "primary.light",
              color: "secondary.main",
              fill: "secondary.light",
              mb: 2,
              cursor: "pointer",
            }
          : {
              backgroundColor: "secondary.light",
              color: "primary.main",
              fill: "secondary.light",
              mb: 2,
              cursor: "pointer",
            }
      }
      onClick={handleClick}
    >
      <Grid container item xs={12} p={2} gap={1}>
        <Grid
          item
          xs={12}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          {type ===
          NotificationType.SUBSCRIPTION_APPLICATION_STATUS_PAYMENT_CANCELED ? (
            <Typography variant="body2" gutterBottom>
              A subscription application payment has been canceled.
            </Typography>
          ) : (
            false
          )}
          {type ===
          NotificationType.SUBSCRIPTION_APPLICATION_STATUS_PAYMENT_CONFIRMED ? (
            <Typography variant="body2" gutterBottom>
              A subscription application payment has been confirmed.
            </Typography>
          ) : (
            false
          )}
          {type ===
          NotificationType.SUBSCRIPTION_APPLICATION_STATUS_PAYMENT_PENDING ? (
            <Typography variant="body2" gutterBottom>
              A subscription application payment is pending.
            </Typography>
          ) : (
            false
          )}
          {type ===
          NotificationType.SUBSCRIPTION_APPLICATION_STATUS_REJECTED ? (
            <Typography variant="body2" gutterBottom>
              A subscription application has been rejected.
            </Typography>
          ) : (
            false
          )}
          {type ===
          NotificationType.SUBSCRIPTION_APPLICATION_STATUS_REVIEWING ? (
            <Typography variant="body2" gutterBottom>
              A subscription application must be reviewed.
            </Typography>
          ) : (
            false
          )}
          {type ===
          NotificationType.SUBSCRIPTION_APPLICATION_STATUS_TO_AMMEND ? (
            <Typography variant="body2" gutterBottom>
              A subscription application must be ammended.
            </Typography>
          ) : (
            false
          )}

          {data?.ref ? (
            <Typography variant="caption">Ref: {data?.ref}</Typography>
          ) : (
            false
          )}
        </Grid>
        <Grid
          item
          xs={12}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Typography
            variant="caption"
            sx={{
              fontStyle: "italic",
            }}
          >
            {createdAt ? timeElapsedSince(createdAt) : false}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
