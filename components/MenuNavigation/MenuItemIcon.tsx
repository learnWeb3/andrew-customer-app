import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface MenuItemIconProps {
  icon: ReactElement;
  label: string;
  path: string;
  onMenuItemClick: () => void;
}

export function MenuItemIcon({
  icon = <PeopleOutlineOutlinedIcon color="inherit" fontSize="small" />,
  label = "Clients",
  path = "/",
  onMenuItemClick = () => {},
}: MenuItemIconProps) {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (
      (path === "/" && router.pathname === path) ||
      (router.pathname.includes(path) && path !== "/")
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [router]);

  function handleClick() {
    router.push(path, undefined, {
      scroll: false,
      shallow: false,
    });
    onMenuItemClick();
  }
  return (
    <MenuItem
      onClick={handleClick}
      selected={isSelected}
      sx={{
        display: "flex",
        gap:2,
        alignItems: "flex-end",
        "&.Mui-selected": {
          backgroundColor: "secondary.main",
          color: "primary.main",
        },
        "&.Mui-selected:hover": {
          backgroundColor: "secondary.main",
        },
        "& span": {
          fontSize: "1.25rem",
        },
        "& svg": {
          fontSize: "1.75rem",
        },
        mt:2,
        mb:2
      }}
    >
      <ListItemIcon
        sx={{ color: isSelected ? "primary.main" : "secondary.main" }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}
