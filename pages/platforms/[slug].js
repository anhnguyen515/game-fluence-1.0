import { getGamesListAPI } from "@/apis/game";
import { getPlatformDetailAPI } from "@/apis/platform";
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

  const platformDetail = await getPlatformDetailAPI(slug).then(
    (res) => res.data
  );

  const platformGames = await getGamesListAPI({
    page_size: PAGINATION_LIMIT,
    ordering,
    platforms: platformDetail.id,
  }).then((res) => res.data);

  if (platformDetail.detail || platformGames.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
      platformDetail,
      platformGames,
    },
  };
}

export default function PlatformDetailPage({
  slug,
  platformDetail,
  platformGames,
}) {
  const router = useRouter();

  const [games, setGames] = React.useState(platformGames);
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
        title={`Games for ${platformDetail.name} - ${SITE_NAME}`}
        canonical={router.pathname.replace("[slug]", slug)}
        openGraph={{
          url: router.asPath,
          images: [
            {
              url: platformDetail.image_background,
              alt: platformDetail.name,
              type: "image/png",
            },
          ],
        }}
      />
      <InnerLayout
        title={`Games for ${platformDetail.name}`}
        titleFontSize={"2.6rem"}
        content={<SortComp />}
        img={platformDetail.image_background}
      >
        <Box mb={3}>
          <ReadMore paragraph={platformDetail.description} />
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
