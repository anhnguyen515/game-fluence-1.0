import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function PageHeader({
  title,
  titleFontSize = "2.2rem",
  subtitle,
  content,
  img,
}) {
  const themeStore = useSelector(selectTheme);
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, ${
          getTheme(themeStore).theme.palette.background.default + "99"
        } ,${
          getTheme(themeStore).theme.palette.background.default
        }), url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        py: 5,
        border: "none",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        fontSize={titleFontSize}
        fontWeight={600}
        gutterBottom
        variant="h1"
      >
        {title}
      </Typography>
      <Typography>{subtitle}</Typography>
      <div>{content}</div>
    </Box>
  );
}
