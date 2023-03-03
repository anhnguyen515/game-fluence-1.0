import { getGameDetailAPI } from "@/apis/game";
import InnerLayout from "@/layout/InnerLayout";
import { SITE_NAME } from "@/utils/constants";
import { ratingColor, upperCaseFirstLetter } from "@/utils/utils";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ReadMore from "@/components/common/ReadMore";

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
        <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
          <ReadMore paragraph={gameDetail.description} />
          <Box sx={{ width: "15rem", height: "15rem", position: "relative" }}>
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
                color={ratingColor(gameDetail.rating).borderColor}
                fontSize={"2.4rem"}
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
                        ratingColor(upperCaseFirstLetter(i.title)).borderColor
                    ),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Box>
        </Stack>
        <pre>{JSON.stringify(gameDetail, null, 2)}</pre>
      </InnerLayout>
    </>
  );
}
