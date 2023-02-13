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
      dark: "#1B346E",
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
    },
  },
});
