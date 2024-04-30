import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { UserAvatar } from "./UserAvatar";
import { Avatar, Hidden } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useToggledState } from "../hooks/useToggledState";
import { ModalWrapper } from "./ModalWrapper";
import MenuNavigation from "./MenuNavigation";
import { useOidc, useOidcUser } from "@axa-fr/react-oidc";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { NotificationBadge } from "./NotificationBadge";
import { NotificationPanel } from "./NotificationPanel";
import { useAppDispatch } from "../store/hooks";
import { clearNotifications } from "../store/reducers/notifications.reducer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "1rem",
  backgroundColor: alpha(theme.palette.primary.light, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: alpha(theme.palette.primary.light, 0.25),
  },
  width: "50%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { toggled, open, close } = useToggledState(false);
  const {
    toggled: notificationToggled,
    open: notificationOpen,
    close: notificationClose,
  } = useToggledState(false);

  const dispatch = useAppDispatch();
  const { logout } = useOidc();
  const { oidcUser } = useOidcUser();
  function handleRedirectToAccountProfile() {
    const url = process.env.NEXT_PUBLIC_OIDC_AUTHORITY + "/account";
    window.location.href = url;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: { xs: "initial", lg: "unset" },
          backgroundColor: { xs: "primary.main", lg: "secondary.main" },
          color: { xs: "secondary.main", lg: "primary.main" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", lg: "flex-end" },
            gap: 4,
          }}
        >
          <Hidden mdUp>
            <IconButton
              size="large"
              edge="end"
              aria-label="Menu"
              aria-haspopup="true"
              onClick={open}
              color="inherit"
              sx={{
                padding: 0,
              }}
            >
              <MenuOutlinedIcon />
            </IconButton>
          </Hidden>

          {/* <Hidden lgDown>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Hidden> */}

          <Box sx={{ display: "flex", gap: 1 }}>
            <NotificationBadge onClick={notificationOpen} />
            {oidcUser ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="My account"
                aria-haspopup="true"
                onClick={handleRedirectToAccountProfile}
              >
                <UserAvatar
                  fullName={`${oidcUser.given_name} ${oidcUser.family_name}`}
                />
              </IconButton>
            ) : (
              false
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="Sign out"
              aria-haspopup="true"
              onClick={() => logout("/")}
            >
              <Avatar variant="circular" sx={{ bgcolor: "primary.main" }}>
                <ExitToAppOutlinedIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <ModalWrapper
        toggled={toggled}
        color="secondary.main"
        close={close}
        padding={0}
        content={<MenuNavigation width={"100%"} onMenuItemClick={close} />}
      />
      <NotificationPanel
        toggled={notificationToggled}
        close={() => {
          dispatch(clearNotifications());
          notificationClose();
        }}
      />
    </Box>
  );
}
