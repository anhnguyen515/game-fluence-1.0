import { getGamesListAPI } from "@/apis/game";
import { getPlatformDetailAPI } from "@/apis/platform";
import PageHeader from "@/components/common/PageHeader";
import ReadMore from "@/components/common/ReadMore";
import GameCard from "@/components/Game/GameCard";
import { SITE_NAME } from "@/utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const PlatformsNavigator = dynamic(
  () => import("@/components/Platform/PlatformsNavigator"),
  { ssr: false }
);

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
  const title = `${platformDetail.name} Games`;
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        title={`${title} - ${SITE_NAME}`}
        canonical={router.pathname.replace("[slug]", slug)}
        openGraph={{ url: router.asPath }}
      />
      <PageHeader
        title={title}
        titleFontSize={"2.6rem"}
        subtitle={
          <Box>
            <ReadMore paragraph={platformDetail.description} />
          </Box>
        }
        content={<SortComp />}
        img={platformDetail.image_background}
      />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <Grid container spacing={2}>
            {!isSmallScreen && (
              <Grid item xs={12} md={2.4} lg={2}>
                <PlatformsNavigator />
              </Grid>
            )}
            <Grid item container spacing={2} xs={12} md={9.6} lg={10}>
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
