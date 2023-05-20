import { getGamesListAPI } from "@/apis/game";
import GamesList from "@/components/Game/Homepage/GamesList";
import InnerLayout from "@/layout/InnerLayout";
import { PAGINATION_LIMIT, SITE_NAME } from "@/utils/constants";
import { dateFormat } from "@/utils/utils";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
import React from "react";

export async function getStaticProps() {
  const [newGames, popularGamesLastYear] = await Promise.all([
    getGamesListAPI({
      dates: `${dateFormat(dayjs().subtract(3, "month"))},${dateFormat(
        dayjs().add(6, "month")
      )}`,
      page_size: PAGINATION_LIMIT,
    }).then((res) => res.data),
    getGamesListAPI({
      dates: `${dateFormat(
        dayjs().subtract(1, "year").startOf("year")
      )},${dateFormat(dayjs().subtract(1, "year").endOf("year"))}`,
      page_size: PAGINATION_LIMIT,
    }).then((res) => res.data),
  ]);

  return {
    props: {
      newGames,
      popularGamesLastYear,
    },
    revalidate: 3600,
  };
}

export default function Home({ newGames, popularGamesLastYear }) {
  const [img] = React.useState(
    () =>
      newGames.results[Math.floor(Math.random() * newGames.results.length)]
        .background_image
  );

  return (
    <>
      <NextSeo
        openGraph={{
          images: [
            {
              url: img,
              type: "image/png",
            },
          ],
        }}
      />
      <InnerLayout
        title={
          <>
            Welcome to{" "}
            <Typography
              color={"primary"}
              component={"span"}
              fontSize="inherit"
              fontWeight={600}
              variant="h1"
            >
              {SITE_NAME}
            </Typography>
          </>
        }
        titleFontSize={"2.4rem"}
        subtitle={
          "Want to know more about your favorite games? We have everything right here."
        }
        img={img}
      >
        <Stack gap={6}>
          <GamesList
            title={"New & Upcoming"}
            games={newGames}
            href={"/games?category=new-and-upcoming"}
          />
          <GamesList
            title={`Popular in ${dayjs().subtract(1, "year").year()}`}
            games={popularGamesLastYear}
            href={"/games?category=popular-last-year"}
          />
        </Stack>
      </InnerLayout>
    </>
  );
}
