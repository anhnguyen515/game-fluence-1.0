import { getGamesListAPI } from "@/apis/game";
import PageHeader from "@/components/common/PageHeader";
import GameCard from "@/components/Game/GameCard";
import { dateFormat } from "@/utils/utils";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const { category } = context.query;
  let data;

  // all games
  if (!category) {
    data = await getGamesListAPI().then((res) => res.data);
  }
  // new games
  else if (category === "new") {
    data = await getGamesListAPI({
      dates: `${dateFormat(dayjs().subtract(3, "month"))},${dateFormat(
        dayjs().add(6, "month")
      )}`,
    }).then((res) => res.data);
  }
  // popular games last year
  else {
    data = await getGamesListAPI({
      dates: `${dateFormat(
        dayjs().subtract(1, "year").startOf("year")
      )},${dateFormat(dayjs().subtract(1, "year").endOf("year"))}`,
    }).then((res) => res.data);
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default function AllGamesPage({ data }) {
  const router = useRouter();
  const { category } = router.query;
  const img =
    data.results[Math.floor(Math.random() * data.results.length)]
      .background_image;

  const [games, setGames] = React.useState(data);
  const [loading, setLoading] = React.useState(false);

  function handleLoadMore() {
    setLoading(true);
    axios
      .get(games.next)
      .then((res) => {
        const data = res.data;
        setGames((prev) => ({
          ...prev,
          next: data.next,
          results: [...prev.results, ...data.results],
        }));
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
        setLoading(false);
      });
  }

  return (
    <>
      <PageHeader
        title={
          !category
            ? "All Games"
            : category === "new"
            ? "New & Upcoming Games"
            : `Popular in ${dayjs().subtract(1, "year").year()}`
        }
        subtitle="Sorted by popularity"
        img={img}
      />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              asdasd
            </Grid>

            <Grid item container spacing={2} xs={12} md={10}>
              {games.results.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <GameCard game={item} />
                </Grid>
              ))}
              {games.next && (
                <Stack
                  alignItems={"center"}
                  mt={3}
                  ml={2}
                  sx={{ width: "100%" }}
                >
                  <LoadingButton
                    loading={loading}
                    onClick={handleLoadMore}
                    size="large"
                    startIcon={<ExpandMoreIcon />}
                  >
                    Load more
                  </LoadingButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
