import { getGamesListAPI } from "@/apis/game";
import GameCard from "@/components/Game/GameCard";
import Searchbar from "@/components/Search/Searchbar";
import InnerLayout from "@/layout/InnerLayout";
import { PAGINATION_LIMIT, SITE_NAME } from "@/utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const FullScreenLoader = dynamic(
  () => import("@/components/loader/FullScreenLoader"),
  { ssr: false }
);

const SortComp = dynamic(() => import("@/components/common/SortComp"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const { q } = context.query;

  return {
    props: {
      q,
    },
  };
}

export default function SearchPage({ q }) {
  const router = useRouter();
  const title = `Search results for ${q}`;

  const [games, setGames] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      search: q,
      search_precise: true,
    }).then((res) => setGames(res.data));
  }, []);

  function handleLoadMore() {
    setLoading(true);
    axios
      .get(games.next)
      .then((res) => {
        const data = res.data;
        setGames((prev) => ({
          ...prev,
          next: data.next,
          previous: data.previous,
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
      <NextSeo
        title={`${title} - ${SITE_NAME}`}
        canonical={router.pathname}
        openGraph={{
          url: router.asPath,
        }}
      />
      <InnerLayout
        title={`Search results for "${q}"`}
        titleFontSize={"2.6rem"}
        subtitle={
          <Typography>
            <b>{games?.count.toLocaleString() || "..."}</b>{" "}
            {games?.count > 1 ? "results" : "result"} found
          </Typography>
        }
        img={
          games &&
          games.results[Math.floor(Math.random() * games.results.length)]
            .background_image
        }
      >
        <Searchbar q={q} />
        {!games ? (
          <Stack alignItems={"center"}>
            <CircularProgress size={64} />
          </Stack>
        ) : (
          <>
            <Grid container spacing={2}>
              {games?.results.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <GameCard game={item} />
                </Grid>
              ))}
            </Grid>
            {games?.next && (
              <Stack alignItems={"center"} mt={3} sx={{ width: "100%" }}>
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
          </>
        )}
      </InnerLayout>
    </>
  );
}
