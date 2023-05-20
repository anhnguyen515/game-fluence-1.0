import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function PageHeader({
  title,
  titleFontSize = "2.2rem",
  subtitle,
  content,
  img,
  avatar,
}) {
  const themeStore = useSelector(selectTheme);
  return (
    <Box
      sx={
        img
          ? {
              backgroundImage: `linear-gradient(to bottom, ${
                getTheme(themeStore).theme.palette.background.default + "99"
              }, ${
                getTheme(themeStore).theme.palette.background.default
              }), url(${img})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : {
              backgroundColor: "transparent",
            }
      }
    >
      <Container maxWidth="2xl">
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          sx={{ px: { xs: 0, md: 3 }, py: 5 }}
        >
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            {avatar && (
              <Avatar
                src={avatar}
                sx={{
                  width: "3.5rem",
                  height: "3.5rem",
                  bgcolor: "primary.main",
                }}
              >
                <Typography fontSize={"1.6rem"}>{avatar}</Typography>
              </Avatar>
            )}
            <Typography
              fontSize={titleFontSize}
              fontWeight={600}
              textAlign={"center"}
              variant="h1"
            >
              {title}
            </Typography>
          </Stack>
          <div>{subtitle}</div>
          <div>{content}</div>
        </Stack>
      </Container>
    </Box>
  );
}
