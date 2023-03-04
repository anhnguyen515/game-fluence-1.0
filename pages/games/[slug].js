import { getGameDetailAPI } from "@/apis/game";
import InnerLayout from "@/layout/InnerLayout";
import { SITE_NAME } from "@/utils/constants";
import {
  dateFormat,
  ratingColor,
  upperCaseFirstLetter,
  getParentPlatform,
} from "@/utils/utils";
import { Box, Breadcrumbs, Chip, Stack, Typography } from "@mui/material";
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
        <Stack
          alignItems={"flex-start"}
          direction={"row"}
          flexWrap={"wrap"}
          gap={2}
          justifyContent={"flex-end"}
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
                        data: [...gameDetail.ratings].map((i) => i.percent),
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
              <Stack
                alignItems={"center"}
                direction={"row"}
                flexWrap={"wrap"}
                gap={3}
                justifyContent={"center"}
                mt={3}
                sx={{ maxWidth: "18rem" }}
              >
                {[...gameDetail.ratings].map((item) => (
                  <Stack
                    key={item.id}
                    alignItems={"center"}
                    direction={"row"}
                    gap={1}
                  >
                    <Chip
                      label={upperCaseFirstLetter(item.title)}
                      size="small"
                      sx={{
                        backgroundColor: ratingColor(
                          upperCaseFirstLetter(item.title)
                        ).backgroundColor,
                        color: "text.primary",
                      }}
                    />
                    <Typography color={"text.main"} fontSize={"0.8rem"}>
                      {item.count.toLocaleString()}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
        <pre>{JSON.stringify(gameDetail, null, 2)}</pre>
      </InnerLayout>
    </>
  );
}
