import { Box } from "@mui/material";
import { defaultTheme, blackPinkTheme } from "@/styles/theme";

function ThemeAvatar({ primary, background }) {
  return (
    <Box
      sx={{
        height: "1.2rem",
        width: "1.2rem",
        borderRadius: "50%",
        backgroundColor: background,
      }}
    >
      <Box
        sx={{
          backgroundColor: primary,
          borderRadius: "100px 0 0 100px",
          width: "0.6rem",
          height: "1.2rem",
        }}
      ></Box>
    </Box>
  );
}

export function getTheme(themeName) {
  switch (themeName) {
    case "defaultTheme":
      return {
        theme: defaultTheme,
        avatar: (
          <ThemeAvatar
            primary={defaultTheme.palette.primary.main}
            background={defaultTheme.palette.background.default}
          />
        ),
      };
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
    default:
      return {
        theme: null,
        avatar: <ThemeAvatar />,
      };
  }
}
