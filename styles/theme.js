import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  typography: {
    fontFamily: ["-apple-system", "BlinkMacSystemFont", "Source Sans Pro"].join(
      ","
    ),
  },
  palette: {
    mode: "light",
    primary: {
      light: "#3B71ED",
      main: "#284BA0",
      dark: "#1B346E",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
});
