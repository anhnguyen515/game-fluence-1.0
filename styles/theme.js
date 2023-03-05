import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// light themes
export const defaultTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      main: grey[600],
      dark: grey[700],
    },
  },
});

export const chicagoTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#F53333",
      main: "#A82324",
      dark: "#8F1E1E",
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
      main: grey[600],
      dark: grey[700],
    },
  },
});

// dark themes
export const blackPinkTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      main: "#F1BBC7",
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
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const blackGoldTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#F2E96B",
      main: "#DCCA6C",
      dark: "#A89A52",
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
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const blackCyanTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#19FBFF",
      main: "#00C2C4",
      dark: "#00A8AB",
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
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const wavezTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#29D93C",
      main: "#50C22F",
      dark: "#44A828",
    },
    secondary: {
      light: "#48648C",
      main: "#202D3F",
      dark: "#1A2433",
    },
    background: {
      default: "#0A373B",
      paper: "#0A373B",
    },
    text: {
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const mecha01Theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#35F060",
      main: "#45D83A",
      dark: "#3DBF34",
    },
    secondary: {
      light: "#295154",
      main: "#0B373A",
      dark: "#0E4447",
    },
    background: {
      default: "#37145F",
      paper: "#37145F",
    },
    text: {
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const nautilusTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#FFF826",
      main: "#FFCE34",
      dark: "#E8A623",
    },
    secondary: {
      light: "#183FA1",
      main: "#1B5789",
      dark: "#164870",
    },
    background: {
      default: "#24335A",
      paper: "#24335A",
    },
    text: {
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const laserTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#FF7396",
      main: "#F1557C",
      dark: "#D94C6F",
    },
    secondary: {
      light: "#804ECF",
      main: "#5C4FB8",
      dark: "#4E449E",
    },
    background: {
      default: "#3D3775",
      paper: "#3D3775",
    },
    text: {
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const blueSamuraiTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#E8BC43",
      main: "#D09E47",
      dark: "#B88B3E",
    },
    secondary: {
      light: "#828282",
      main: "#363636",
      dark: "#333333",
    },
    background: {
      default: "#284360",
      paper: "#284360",
    },
    text: {
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});

export const redSamuraiTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
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
      light: "#E8BC43",
      main: "#D09E47",
      dark: "#B88B3E",
    },
    secondary: {
      light: "#828282",
      main: "#363636",
      dark: "#333333",
    },
    background: {
      default: "#5D2D3B",
      paper: "#5D2D3B",
    },
    text: {
      light: grey[700],
      main: grey[500],
      dark: grey[400],
    },
  },
});
