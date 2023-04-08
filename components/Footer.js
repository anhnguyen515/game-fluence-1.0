import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  BsGithub,
  BsLinkedin,
  BsMailbox2,
  BsTelephoneFill,
} from "react-icons/bs";

export default function Footer() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <footer>
      <Box>
        <Container maxWidth="2xl">
          <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} order={{ xs: 2, md: 0 }}>
                <Stack alignItems={{ xs: "center", md: "flex-start" }}>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <BsTelephoneFill fontSize={12} /> (+84) 39 8938 320
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <BsMailbox2 fontSize={12} /> ndtatuananh@gmail.com
                  </Typography>
                  <Link href={"https://www.linkedin.com/in/ndtatuananh/"}>
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <BsLinkedin fontSize={12} /> ndtatuananh
                    </Typography>
                  </Link>
                  <Typography variant="caption" sx={{ mt: 2 }}>
                    Feel free to contact if you want to work with me
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                {isSmallScreen ? (
                  <Stack alignItems={"center"}>
                    {theme.palette.mode === "light" ? (
                      <Image
                        alt="logo"
                        src="/img/GameFluence-black-250px.png"
                        width={180}
                        height={75}
                      />
                    ) : (
                      <Image
                        alt="logo"
                        src="/img/GameFluence-white-250px.png"
                        width={180}
                        height={75}
                      />
                    )}
                  </Stack>
                ) : (
                  <Stack alignItems={"center"}>
                    {theme.palette.mode === "light" ? (
                      <Image
                        alt="logo"
                        src="/img/GameFluence-black-250px.png"
                        width={250}
                        height={105}
                      />
                    ) : (
                      <Image
                        alt="logo"
                        src="/img/GameFluence-white-250px.png"
                        width={250}
                        height={105}
                      />
                    )}
                  </Stack>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack alignItems={{ xs: "center", md: "flex-end" }}>
                  <Typography variant="caption">
                    Made by Anh Nguyen with 💕
                  </Typography>
                  <Typography variant="caption">
                    Data & API provided by{" "}
                    <Link href={"https://rawg.io"} className="font-semibold">
                      RAWG
                    </Link>
                  </Typography>
                  <Link
                    href={"https://github.com/anhnguyen515/game-fluence-2.0"}
                  >
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <BsGithub />
                      game-fluence-2.0
                    </Typography>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
