import { getGamesListAPI } from "@/apis/game";
import GamesList from "@/components/Game/Homepage/GamesList";
import { SITE_NAME } from "@/utils/constants";
import { addTime, dateFormat } from "@/utils/utils";
import { Box, Container, Stack, Typography } from "@mui/material";

export async function getStaticProps(context) {
  const [newGames, topGames] = await Promise.all([
    getGamesListAPI({
      page_size: 10,
      dates: `${dateFormat(new Date())},${dateFormat(
        addTime(new Date(), 6, "month")
      )}`,
      ordering: "released",
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

  return (
    <>
      <Box
        sx={{
          minHeight: "18rem",
          backgroundImage: `linear-gradient(to bottom,rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.8)), url(${heroImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -1,
          transition: "background-image 0.5s",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          color={"text.light"}
          fontSize={"2.2rem"}
          fontWeight={600}
          variant="h1"
        >
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
        <Typography color={"text.main"}>
          Your nice & cozy video games platform
        </Typography>
      </Box>
      <Container maxWidth="2xl">
        <Stack gap={6} sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <GamesList
            title={"New & Upcoming Games"}
            games={newGames}
            href={"/new-games"}
          />
          <GamesList
            title={"All Time Games"}
            games={topGames}
            href={"/all-time-games"}
          />
        </Stack>
      </Container>
    </>
  );
}
