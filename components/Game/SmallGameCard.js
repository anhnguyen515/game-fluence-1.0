import { Box, Stack, Typography, useTheme } from "@mui/material";

export default function SmallGameCard({ item }) {
  const theme = useTheme();
  return (
    <Stack direction={"row"} gap={1}>
      <Box
        sx={{
          width: "10rem",
          aspectRatio: "1920/1080",
          borderRadius: 1,
          backgroundImage: `url(${
            item.background_image ||
            (theme.palette.mode === "light"
              ? "/img/logo-black-250px.png"
              : "/img/logo-white-250px.png")
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Stack>
        <Typography variant="h2" fontSize={"1.3rem"} fontWeight={600}>
          {item.name}
        </Typography>
      </Stack>
    </Stack>
  );
}
