import { Box } from "@mui/material";
import { defaultTheme, blackPinkTheme } from "@/styles/theme";

function ThemeAvatar({ primary, background }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "1.2rem",
        width: "1.2rem",
        borderRadius: "50%",
        backgroundColor: background,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -1,
          left: -2,
          backgroundColor: primary,
          borderRadius: "10rem 0 0 10rem",
          width: "0.65rem",
          height: "1.2rem",
        }}
      ></Box>
    </Box>
  );
}

export function getTheme(themeName) {
  switch (themeName) {
    case "blackPinkTheme":
      return {
        theme: blackPinkTheme,
        avatar: (
          <ThemeAvatar
            primary={blackPinkTheme.palette.primary.main}
            background={blackPinkTheme.palette.background.default}
          />
        ),
      };
    case "defaultTheme":
    default:
      return {
        theme: defaultTheme,
        avatar: (
          <ThemeAvatar
            primary={defaultTheme.palette.primary.main}
            background={defaultTheme.palette.background.default}
          />
        ),
      };
  }
}
