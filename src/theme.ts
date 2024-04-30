import { Roboto } from "next/font/google";
import { PaletteOptions, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#04103B",
      light: "#085FCE",
    },
    secondary: {
      main: "#FFF",
    },
    error: {
      main: red.A400,
    },
    orange: {
      main: "#F46036",
      light: "#f67f5e",
      dark: "#aa4325",
    },
  } as PaletteOptions,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
