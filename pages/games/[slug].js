import {
  getGameAdditionsAPI,
  getGameCreatorsListAPI,
  getGameDetailAPI,
  getGameScreenshotsAPI,
  getGamesSeriesAPI,
  getGameStoresAPI,
  getGameTrailersAPI,
} from "@/apis/game";
import CategoryTitle from "@/components/common/CategoryTitle";
import ReadMore from "@/components/common/ReadMore";
import GameCreatorsList from "@/components/Game/Detail/GameCreatorsList";
import GameInformation from "@/components/Game/Detail/GameInformation";
import GameRatings from "@/components/Game/Detail/GameRatings";
import GameScreenshots from "@/components/Game/Detail/GameScreenshots";
import InnerLayout from "@/layout/InnerLayout";
import { selectTheme } from "@/store/slices/themeSlice";
import { PAGINATION_LIMIT, SITE_NAME } from "@/utils/constants";
import {
  dateFormat,
  getGameStore,
  getParentPlatform,
  getTheme,
} from "@/utils/utils";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FullScreenLoader = dynamic(
  () => import("@/components/loader/FullScreenLoader"),
  { ssr: false }
);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const gameDetail = await getGameDetailAPI(slug).then((res) => res.data);

  if (gameDetail.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
      gameDetail,
    },
    revalidate: 60,
  };
}

export default function GameDetailPage({ slug, gameDetail }) {
  const router = useRouter();
  const themeStore = useSelector(selectTheme);

  const [gameTrailers, setGameTrailers] = React.useState(null);
  const [gameCreators, setGameCreators] = React.useState(null);
  const [gameScreenshots, setGameScreenshots] = React.useState(null);
  const [gameStores, setGameStores] = React.useState(null);
  const [gameAdditions, setGameAdditions] = React.useState(null);
  const [gamesSeries, setGamesSeries] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    getGameTrailersAPI(slug).then((res) => setGameTrailers(res.data));
    getGameScreenshotsAPI(slug).then((res) => setGameScreenshots(res.data));
    getGameStoresAPI(slug).then((res) => setGameStores(res.data));
    getGameAdditionsAPI(slug).then((res) => setGameAdditions(res.data));
    getGamesSeriesAPI(slug).then((res) => setGamesSeries(res.data));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    getGameCreatorsListAPI(slug, { page_size: PAGINATION_LIMIT, page })
      .then((res) => {
        setGameCreators(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
        setLoading(false);
      });
  }, [page]);

  function handleChangePage(event, value) {
    setPage(value);
  }

  return (
    <>
      <NextSeo
        title={`${gameDetail.name} - ${SITE_NAME}`}
        canonical={router.pathname.replace("[slug]", slug)}
        description={gameDetail.description_raw}
        openGraph={{
          url: router.asPath,
          images: [
            {
              url: gameDetail.background_image,
              alt: gameDetail.name,
              type: "image/png",
            },
          ],
        }}
      />
      {!(
        gameTrailers &&
        gameScreenshots &&
        gameStores &&
        gameAdditions &&
        gamesSeries &&
        gameCreators
      ) && <FullScreenLoader />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to bottom, ${
            getTheme(themeStore).theme.palette.background.default + "99"
          }, ${getTheme(themeStore).theme.palette.background.default}), url(${
            gameDetail.background_image
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -1,
        }}
      />
      <InnerLayout
        title={gameDetail.name}
        titleFontSize={"4rem"}
        subtitle={
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            {gameDetail.released && (
              <Chip
                label={dateFormat(gameDetail.released, "MMM DD, YYYY")}
                sx={{ mr: 1 }}
              />
            )}
            {gameDetail.parent_platforms.map((item, index) => (
              <span key={index}>
                {getParentPlatform(item.platform.name, 24)}
              </span>
            ))}
          </Stack>
        }
        content={
          <Breadcrumbs>
            <Link href={"/"}>
              <Typography color={"text.dark"}>Home</Typography>
            </Link>
            <Link href={"/games"}>
              <Typography color={"text.dark"}>Games</Typography>
            </Link>
            <Typography>{gameDetail.name}</Typography>
          </Breadcrumbs>
        }
        // img={gameDetail.background_image}
      >
        <Grid
          container
          spacing={2}
          sx={{
            ".content": { color: "text.dark" },
            ".link": {
              transition: "color 0.2s",
              "&:hover": { color: "primary.light" },
            },
          }}
        >
          <Grid item xs={12} md={8}>
            <Stack gap={3}>
              {/* ratings graph */}
              {gameDetail.rating > 0 && <GameRatings gameDetail={gameDetail} />}

              {/* summary */}
              {
                <Stack>
                  <CategoryTitle title={"Summary"} />
                  {gameDetail.description ? (
                    <ReadMore
                      paragraph={gameDetail.description}
                      fontSize="1rem"
                    />
                  ) : (
                    <Typography sx={{ color: "text.dark" }}>-</Typography>
                  )}
                </Stack>
              }

              {/* other information */}
              <GameInformation
                gameDetail={gameDetail}
                gameAdditions={gameAdditions}
                gamesSeries={gamesSeries}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack gap={3}>
              <div>
                {gameTrailers?.count > 0 && (
                  <Box
                    sx={{
                      borderRadius: 1,
                      overflow: "hidden",
                      mb: 1,
                      aspectRatio: "1920/1080",
                    }}
                  >
                    <ReactPlayer
                      url={
                        gameTrailers.results[
                          Math.floor(Math.random() * gameTrailers.count)
                        ].data.max
                      }
                      playing
                      controls
                      light={
                        <img
                          alt="Thumbnail"
                          src={
                            gameTrailers.results[
                              Math.floor(Math.random() * gameTrailers.count)
                            ].preview
                          }
                        />
                      }
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
                )}
                {gameScreenshots?.count > 0 && (
                  <GameScreenshots screenshots={gameScreenshots} />
                )}
              </div>
              <div>
                <CategoryTitle title={"Available at"} />
                {gameStores?.count > 0 ? (
                  <Grid container spacing={1}>
                    {gameStores.results.map((item) => (
                      <Grid key={item.id} item xs={12} sm={6}>
                        <Button
                          component={"a"}
                          target="_blank"
                          rel="noreferrer"
                          href={item.url}
                          fullWidth
                          size="large"
                          startIcon={getGameStore(item.store_id).icon}
                          sx={{ py: 2 }}
                          variant="outlined"
                        >
                          {getGameStore(item.store_id).name}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography className="content">-</Typography>
                )}
              </div>
            </Stack>
          </Grid>
        </Grid>
        <GameCreatorsList gameCreators={gameCreators} loading={loading} />
        {gameCreators?.count > PAGINATION_LIMIT && (
          <Stack alignItems={"center"} mt={3} sx={{ width: "100%" }}>
            <Pagination
              color="primary"
              count={Math.ceil(gameCreators.count / PAGINATION_LIMIT)}
              onChange={handleChangePage}
              page={page}
              shape="rounded"
            />
          </Stack>
        )}
      </InnerLayout>
    </>
  );
}
