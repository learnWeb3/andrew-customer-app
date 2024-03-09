import { Badge, IconButton } from "@mui/material";
import { selectNotifications } from "../store/reducers/notifications.reducer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

export interface NotificationBadgeProps {
  onClick: () => void;
}
export function NotificationBadge({
  onClick = () => {},
}: NotificationBadgeProps) {
  const liveNotifications = useAppSelector(selectNotifications);

  return (
    <IconButton
      size="large"
      aria-label={
        liveNotifications?.length
          ? `show ${liveNotifications?.length} new notifications`
          : "show notifications"
      }
      onClick={onClick}
    >
      {liveNotifications?.length ? (
        <Badge badgeContent={liveNotifications.length} color="error">
          <NotificationsIcon
            fontSize="large"
            sx={{
              color: {
                xs: "secondary.main",
                lg: "primary.main",
              },
            }}
          />
        </Badge>
      ) : (
        <NotificationsIcon
          fontSize="large"
          sx={{
            color: {
              xs: "secondary.main",
              lg: "primary.main",
            },
          }}
        />
      )}
    </IconButton>
  );
}
