import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { Logo } from "../../icons/Logo";
import { MenuItemIcon } from "./MenuItemIcon";

export interface MenuNavigationProps {
  width?: string | number;
  onMenuItemClick?: () => void;
}

export default function MenuNavigation({
  width = "25%",
  onMenuItemClick = () => {},
}: MenuNavigationProps) {
  return (
    <Paper
      sx={{
        width,
        minHeight: "100vh",
        backgroundColor: "primary.main",
        color: "secondary.main",
        fill: "secondary.main",
        position: "fixed",
        padding: "1rem",
      }}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Logo height="2.5rem" />
          </ListItemIcon>
        </MenuItem>

        <Divider
          sx={{
            backgroundColor: "secondary.main",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        />

        <MenuItemIcon
          label="Applications"
          icon={<PeopleOutlineOutlinedIcon color="inherit" />}
          path="/applications"
          onMenuItemClick={onMenuItemClick}
        />

        <MenuItemIcon
          label="Contracts"
          icon={<DescriptionOutlinedIcon color="inherit" />}
          path="/contracts"
          onMenuItemClick={onMenuItemClick}
        />
      </MenuList>
    </Paper>
  );
}
