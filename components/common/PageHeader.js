import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function PageHeader({ title, subtitle, content, img }) {
  const themeStore = useSelector(selectTheme);
  return (
    <Box
      sx={{
        backgroundImage:
          getTheme(themeStore).theme.palette.mode === "dark"
            ? `linear-gradient(to bottom, rgba(48, 48, 48, 0.5), rgba(48, 48, 48, 1)), url(${img})`
            : `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        p: 5,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography fontSize={"2.2rem"} fontWeight={600} variant="h1">
        {title}
      </Typography>
      <Typography>{subtitle}</Typography>
      <div>{content}</div>
    </Box>
  );
}
