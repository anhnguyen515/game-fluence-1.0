import { getGamesListAPI } from "@/utils/apis";
import { SITE_NAME } from "@/utils/constants";
import { Box, Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const NewGamesHomepage = dynamic(
  () => import("@/components/Game/Homepage/NewGamesHomepage"),
  { loading: () => "Loading..." }
);

export async function getStaticProps(context) {
  const games = await getGamesListAPI().then((res) => res.data);

  return {
    props: {
      games,
    },
    revalidate: 60,
  };
}

export default function Home({ games }) {
  const heroImage =
    games.results[Math.floor(Math.random() * games.results.length)]
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
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <NewGamesHomepage games={games} />
        </Box>
      </Container>
    </>
  );
}
