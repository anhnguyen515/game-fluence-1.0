import { getGamesListAPI } from "@/apis/game";
import GamesList from "@/components/Game/Homepage/GamesList";
import { selectTheme } from "@/store/slices/themeSlice";
import { selectUser } from "@/store/slices/userSlice";
import { SITE_NAME } from "@/utils/constants";
import { addTime, dateFormat, getTheme } from "@/utils/utils";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export async function getStaticProps(context) {
  const [newGames, topGames] = await Promise.all([
    getGamesListAPI({
      // ordering: "released",
      dates: `${dateFormat(new Date())},${dateFormat(
        addTime(new Date(), 6, "month")
      )}`,
      page_size: 10,
    }).then((res) => res.data),
    getGamesListAPI({ page_size: 10 }).then((res) => res.data),
  ]);

  return {
    props: {
      newGames,
      topGames,
    },
    revalidate: 60,
  };
}

export default function Home({ newGames, topGames }) {
  const heroImage =
    newGames.results[Math.floor(Math.random() * newGames.results.length)]
      .background_image;
  const themeStore = useSelector(selectTheme);
  const userStore = useSelector(selectUser);
  const router = useRouter();

  return (
    <>
      {/* hero section */}
      <Box
        sx={{
          minHeight: "15rem",
          backgroundImage:
            getTheme(themeStore).theme.palette.mode === "dark"
              ? `linear-gradient(to bottom, rgba(48, 48, 48, 0.5), rgba(48, 48, 48, 1)), url(${heroImage})`
              : `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url(${heroImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={"2.2rem"} fontWeight={600} variant="h1">
          Welcome to{" "}
          <Typography
            color={"primary.light"}
            component={"span"}
            fontSize={"2.2rem"}
            fontWeight={600}
          >
            {SITE_NAME}
          </Typography>
        </Typography>
        <Typography>Everything you need for video games</Typography>
        <Stack alignItems={"center"} direction={"row"} gap={1} mt={3}>
          {!userStore.isAuthenticated && (
            <Button
              onClick={() => router.push("/auth/login")}
              size="large"
              variant="contained"
            >
              GET STARTED
            </Button>
          )}
          <Button size="large" variant="outlined">
            Browse Games
          </Button>
        </Stack>
      </Box>

      {/* content section */}
      <Container maxWidth="2xl">
        <Stack gap={6} sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <GamesList
            title={"New & Upcoming"}
            games={newGames}
            href={"/games"}
          />
          <GamesList
            title={"All Time Favorite"}
            games={topGames}
            href={"/games"}
          />
        </Stack>
      </Container>
    </>
  );
}
