import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "2rem",
      height: "2rem",
      fontSize: "1rem",
    },
    children: `${name.split(" ")[0][0]?.toUpperCase()}${name
      .split(" ")[1][0]
      ?.toUpperCase()}`,
  };
}

export interface UserAvatarProps {
  fullName: string;
}

export function UserAvatar({ fullName }: UserAvatarProps) {
  return <Avatar {...stringAvatar(fullName)} variant="circular" />;
}
