import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Box, Stack, Typography } from "@mui/material";
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
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      gap={1}
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
        px: { xs: 2, md: 5 },
      }}
    >
      <Typography fontSize={titleFontSize} fontWeight={600} variant="h1">
        {title}
      </Typography>
      <div>{subtitle}</div>
      <div>{content}</div>
    </Stack>
  );
}
