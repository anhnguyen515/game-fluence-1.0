import {
  blackCyanTheme,
  blackGoldTheme,
  blackPinkTheme,
  blueSamuraiTheme,
  chicagoTheme,
  defaultTheme,
  laserTheme,
  mecha01Theme,
  nautilusTheme,
  redSamuraiTheme,
  wavezTheme,
} from "@/styles/theme";
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
import { SiAtari, SiNintendoswitch, SiSega } from "react-icons/si";

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
      return <SiNintendoswitch size={size} />;
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

function ThemeAvatar({ theme }) {
  return (
    <Box
      sx={{
        width: "1.2rem",
        height: "1.2rem",
        borderRadius: "50%",
        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 50%, ${theme.palette.background.default} 50%)`,
      }}
    />
  );
}

export function getTheme(themeName) {
  switch (themeName) {
    case "blackPinkTheme":
      return {
        theme: blackPinkTheme,
        avatar: <ThemeAvatar theme={blackPinkTheme} />,
      };
    case "blackGoldTheme":
      return {
        theme: blackGoldTheme,
        avatar: <ThemeAvatar theme={blackGoldTheme} />,
      };
    case "blackCyanTheme":
      return {
        theme: blackCyanTheme,
        avatar: <ThemeAvatar theme={blackCyanTheme} />,
      };
    case "wavezTheme":
      return {
        theme: wavezTheme,
        avatar: <ThemeAvatar theme={wavezTheme} />,
      };
    case "mecha01Theme":
      return {
        theme: mecha01Theme,
        avatar: <ThemeAvatar theme={mecha01Theme} />,
      };
    case "chicagoTheme":
      return {
        theme: chicagoTheme,
        avatar: <ThemeAvatar theme={chicagoTheme} />,
      };
    case "nautilusTheme":
      return {
        theme: nautilusTheme,
        avatar: <ThemeAvatar theme={nautilusTheme} />,
      };
    case "laserTheme":
      return {
        theme: laserTheme,
        avatar: <ThemeAvatar theme={laserTheme} />,
      };
    case "blueSamuraiTheme":
      return {
        theme: blueSamuraiTheme,
        avatar: <ThemeAvatar theme={blueSamuraiTheme} />,
      };
    case "redSamuraiTheme":
      return {
        theme: redSamuraiTheme,
        avatar: <ThemeAvatar theme={redSamuraiTheme} />,
      };
    case "defaultTheme":
    default:
      return {
        theme: defaultTheme,
        avatar: <ThemeAvatar theme={defaultTheme} />,
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

export function insertAtIndex(str, substr, index = 1) {
  return str.slice(0, index) + substr + str.slice(index);
}
