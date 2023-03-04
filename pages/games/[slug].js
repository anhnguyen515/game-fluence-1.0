import { getGameDetailAPI } from "@/apis/game";
import CategoryTitle from "@/components/common/CategoryTitle";
import ReadMore from "@/components/common/ReadMore";
import InnerLayout from "@/layout/InnerLayout";
import { SITE_NAME } from "@/utils/constants";
import {
  dateFormat,
  ratingColor,
  upperCaseFirstLetter,
  getParentPlatform,
} from "@/utils/utils";
import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export async function getServerSideProps(context) {
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
  };
}

export default function GameDetailPage({ slug, gameDetail }) {
  const title = gameDetail.name;
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${title} - ${SITE_NAME}`}
        canonical={router.pathname.replace("[slug]", slug)}
        description={gameDetail.description_raw}
        openGraph={{ url: router.asPath }}
      />

      <InnerLayout
        title={title}
        titleFontSize={"4rem"}
        subtitle={
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            <Chip
              label={dateFormat(gameDetail.released, "MMM DD, YYYY")}
              sx={{ mr: 1 }}
            />
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
              <Typography color={"text.main"}>Home</Typography>
            </Link>
            <Link href={"/games"}>
              <Typography color={"text.main"}>Games</Typography>
            </Link>
            <Typography>{title}</Typography>
          </Breadcrumbs>
        }
        img={gameDetail.background_image}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack gap={3}>
              {/* ratings graph */}
              <Stack
                alignItems={"flex-start"}
                direction={"row"}
                flexWrap={"wrap"}
                gap={2}
                justifyContent={"center"}
              >
                {gameDetail.rating > 0 && (
                  <Stack alignItems={"center"}>
                    <Box
                      sx={{
                        maxWidth: "15rem",
                        aspectRatio: "1",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: -1,
                        }}
                      >
                        <Typography
                          color={
                            ratingColor(
                              upperCaseFirstLetter(gameDetail.ratings[0].title)
                            ).borderColor
                          }
                          fontSize={"2.5rem"}
                          fontWeight={600}
                        >
                          {gameDetail.rating}
                        </Typography>
                      </Box>
                      <Doughnut
                        data={{
                          labels: [...gameDetail.ratings].map((i) =>
                            upperCaseFirstLetter(i.title)
                          ),
                          datasets: [
                            {
                              label: "% of ratings",
                              data: [...gameDetail.ratings].map(
                                (i) => i.percent
                              ),
                              backgroundColor: [...gameDetail.ratings].map(
                                (i) =>
                                  ratingColor(upperCaseFirstLetter(i.title))
                                    .backgroundColor
                              ),
                              borderColor: [...gameDetail.ratings].map(
                                (i) =>
                                  ratingColor(upperCaseFirstLetter(i.title))
                                    .borderColor
                              ),
                              borderWidth: 1,
                            },
                          ],
                        }}
                      />
                    </Box>
                    <Typography sx={{ mt: 3 }}>
                      {gameDetail.ratings_count.toLocaleString()}{" "}
                      {gameDetail.ratings_count > 1 ? `ratings` : `rating`}
                    </Typography>
                    <Stack
                      alignItems={"center"}
                      direction={"row"}
                      flexWrap={"wrap"}
                      gap={2}
                      justifyContent={"center"}
                      mt={1}
                    >
                      {[...gameDetail.ratings].map((item) => (
                        <Chip
                          key={item.id}
                          label={
                            <Stack
                              alignItems={"center"}
                              direction={"row"}
                              gap={1}
                            >
                              <Typography fontSize={"0.8rem"}>
                                {upperCaseFirstLetter(item.title)}
                              </Typography>
                              <Typography
                                color={"text.main"}
                                fontSize={"0.8rem"}
                              >
                                {item.count.toLocaleString()}
                              </Typography>
                            </Stack>
                          }
                          size="small"
                          sx={{
                            backgroundColor: ratingColor(
                              upperCaseFirstLetter(item.title)
                            ).backgroundColor,
                            color: "text.primary",
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}
              </Stack>

              {/* summary */}
              <Stack>
                <CategoryTitle title={"Summary"} />
                <ReadMore paragraph={gameDetail.description_raw} />
              </Stack>

              {/* platforms, genres, ... */}
              <Box sx={{ ".content": { color: "text.main" } }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <CategoryTitle title={"Platforms"} />
                  </Grid>
                  <Grid item xs={6}>
                    <CategoryTitle title={"Metascore"} />
                  </Grid>
                  <Grid item xs={6}>
                    <CategoryTitle title={"Genres"} />
                  </Grid>
                  <Grid item xs={6}>
                    <CategoryTitle title={"Released date"} />
                  </Grid>
                  <Grid item xs={6}>
                    <CategoryTitle title={"Developer"} />
                  </Grid>
                  <Grid item xs={6}>
                    <CategoryTitle title={"Publisher"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CategoryTitle title={"ESRB rating"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CategoryTitle title={"Other games in the series"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CategoryTitle title={"DLC & editions"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CategoryTitle title={"Tags"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CategoryTitle title={"Website"} />
                    <Link href={gameDetail.website}>
                      <Typography
                        className="content"
                        sx={{
                          transition: "color 0.2s",
                          "&:hover": {
                            color: "primary.light",
                          },
                        }}
                      >
                        {gameDetail.website}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            Screenshots & Stores
          </Grid>
        </Grid>
      </InnerLayout>
    </>
  );
}
