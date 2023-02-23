import { blackGoldTheme, blackPinkTheme, defaultTheme } from "@/styles/theme";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { GoBrowser } from "react-icons/go";
import { IoIosPhonePortrait } from "react-icons/io";
import { SiAtari, SiNintendo, SiSega } from "react-icons/si";

dayjs.extend(relativeTime);

export function getParentPlatform(platform, size = 16) {
  switch (platform) {
    case "PC":
      return <FaWindows size={size} />;
    case "PlayStation":
      return <FaPlaystation size={size} />;
    case "Xbox":
      return <FaXbox size={size} />;
    case "iOS":
      return <IoIosPhonePortrait size={size} />;
    case "Android":
      return <FaAndroid size={size} />;
    case "Apple Macintosh":
      return <FaApple size={size} />;
    case "Linux":
      return <FaLinux size={size} />;
    case "Nintendo":
      return <SiNintendo size={size} />;
    case "Atari":
      return <SiAtari size={size} />;
    case "SEGA":
      return <SiSega size={size} />;
    case "Web":
      return <GoBrowser size={size} />;
    default:
      return <BsFillQuestionCircleFill size={size} />;
  }
}

function ThemeAvatar({ primary, secondary }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "1.2rem",
        width: "1.2rem",
        borderRadius: "50%",
        backgroundColor: secondary,
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
            secondary={blackPinkTheme.palette.secondary.main}
          />
        ),
      };
    case "blackGoldTheme":
      return {
        theme: blackGoldTheme,
        avatar: (
          <ThemeAvatar
            primary={blackGoldTheme.palette.primary.main}
            secondary={blackGoldTheme.palette.secondary.main}
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
            secondary={defaultTheme.palette.secondary.main}
          />
        ),
      };
  }
}

export function dateFormat(dateStr, format = "YYYY-MM-DD") {
  const dt = dayjs(dateStr);
  return dt.format(format);
}

export function timeFromNow(dateStr) {
  return dayjs(dateStr).fromNow();
}
