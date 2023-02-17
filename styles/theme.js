import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
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
      dark: "#224087",
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: grey[800],
      light: grey[200],
      main: grey[500],
      dark: grey[700],
    },
  },
});

export const blackPinkTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  typography: {
    fontFamily: ["-apple-system", "BlinkMacSystemFont", "Source Sans Pro"].join(
      ","
    ),
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#FB7D94",
      main: "#F9C8D1",
      dark: "#C79FA6",
    },
    secondary: {
      light: "#A8A8A8",
      main: "#5C5C5C",
      dark: "#424242",
    },
    background: {
      default: "#303030",
      paper: "#303030",
    },
    text: {
      light: grey[200],
      main: grey[500],
      dark: grey[700],
    },
  },
});
