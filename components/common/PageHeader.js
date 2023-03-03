import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Box, Container, Stack, Typography } from "@mui/material";
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
        }, ${
          getTheme(themeStore).theme.palette.background.default
        }), url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="2xl">
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          sx={{ px: { xs: 1, md: 3 }, py: 5 }}
        >
          <Typography
            // color={"primary"}
            fontSize={titleFontSize}
            fontWeight={600}
            variant="h1"
          >
            {title}
          </Typography>
          <div>{subtitle}</div>
          <div>{content}</div>
        </Stack>
      </Container>
    </Box>
  );
}
