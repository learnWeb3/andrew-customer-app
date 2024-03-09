import { useEffect, useState } from "react";
import { PaginatedResults } from "../../lib/paginated-results.interface";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { listUserNotifications } from "../../services/andrew-api.service";
import { selectAuthenticatedUserId } from "../../store/reducers/authenticated-user.reducer";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Backdrop,
  Box,
  IconButton,
  ListItemIcon,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NotificationItem } from "./NotificationItem";
import { Notification } from "../../lib/notification.interface";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppSelector } from "../../store/hooks";
import { selectNotifications } from "../../store/reducers/notifications.reducer";

export interface NotificationPanelProps {
  toggled: boolean;
  close: () => void;
}

export function NotificationPanel({
  toggled = false,
  close = () => {},
}: NotificationPanelProps) {
  const { accessToken } = useOidcAccessToken();
  const authenticatedUserId = useAppSelector(selectAuthenticatedUserId);
  const liveNotifications = useAppSelector(selectNotifications);
  const [notifications, setNotifications] = useState<
    PaginatedResults<Notification<any>>
  >({
    count: 0,
    start: 0,
    limit: 10,
    results: [],
  });

  useEffect(() => {
    if (accessToken && authenticatedUserId && toggled) {
      listUserNotifications(authenticatedUserId, accessToken, {
        start: 0,
        limit: 10,
      }).then((data) => {
        setNotifications(data);
      });
    }
  }, [accessToken, toggled, liveNotifications, authenticatedUserId]);

  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Modal
      open={toggled}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Paper
        sx={{
          width: matches ? "33vw" : "100vw",
          height: "100vh",
          backgroundColor: "primary.main",
          color: "secondary.main",
          fill: "secondary.main",
          position: "fixed",
          padding: "2rem",
          right: 0,
          top: 0,
          zIndex: 1000,
          overflow: "auto",
        }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="Menu"
          aria-haspopup="true"
          onClick={close}
          color="inherit"
          sx={{
            padding: 0,
            position: "absolute",
            right: "2rem",
            top: "1rem",
            zIndex: 100,
          }}
        >
          <CloseOutlinedIcon color="inherit" />
        </IconButton>

        <MenuList>
          <Box>
            <MenuItem>
              <ListItemIcon>
                <NotificationsIcon color="secondary" />
              </ListItemIcon>
              <Typography variant="h6">Notifications</Typography>
            </MenuItem>
          </Box>

          <Divider
            sx={{
              backgroundColor: "secondary.main",
            }}
          />

          <Box mt={2}>
            {notifications?.results?.map(
              (notification: Notification<any>, index) => (
                <NotificationItem
                  key={`notification-${index}`}
                  type={notification.type}
                  data={notification.data}
                  createdAt={notification.createdAt}
                  close={close}
                  id={notification._id}
                />
              )
            )}

            {!notifications?.results?.length ? (
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  fontSize: "2rem",
                }}
                minHeight={"50vh"}
              >
                <NotificationsIcon fontSize="inherit" />
                <Typography variant="h6">Nothing new here...</Typography>
              </Box>
            ) : (
              false
            )}
          </Box>
        </MenuList>
      </Paper>
    </Modal>
  );
}
