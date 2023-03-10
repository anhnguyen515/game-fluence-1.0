import { getDeveloperDetailAPI } from "@/apis/developer";
import { getGamesListAPI } from "@/apis/game";
import ReadMore from "@/components/common/ReadMore";
import GameCard from "@/components/Game/GameCard";
import InnerLayout from "@/layout/InnerLayout";
import { PAGINATION_LIMIT, SITE_NAME } from "@/utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const SortComp = dynamic(() => import("@/components/common/SortComp"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const { slug, sort, reverse } = context.query;
  let ordering =
    !sort || sort === "popularity"
      ? "-added"
      : sort === "released-date"
      ? "-released"
      : "-metacritic";
  if (reverse === "true") {
    ordering = ordering.replace("-", "");
  }

  const [developerDetail, developerGames] = await Promise.all([
    getDeveloperDetailAPI(slug).then((res) => res.data),
    getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      ordering,
      developers: slug,
    }).then((res) => res.data),
  ]);
  if (developerDetail.detail || developerGames.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
      developerDetail,
      developerGames,
    },
  };
}

export default function DeveloperDetailPage({
  slug,
  developerDetail,
  developerGames,
}) {
  const title = `Developed by ${developerDetail.name}`;
  const router = useRouter();

  const [games, setGames] = React.useState(developerGames);
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
        canonical={router.pathname.replace("[slug]", slug)}
        openGraph={{ url: router.asPath }}
      />
      <InnerLayout
        title={title}
        titleFontSize={"2.6rem"}
        content={<SortComp />}
        img={developerDetail.image_background}
      >
        <Box mb={3}>
          <ReadMore paragraph={developerDetail.description} />
        </Box>
        <Grid container spacing={2}>
          {games.results.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <GameCard game={item} />
            </Grid>
          ))}
        </Grid>
        {games.next && (
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
      </InnerLayout>
    </>
  );
}
