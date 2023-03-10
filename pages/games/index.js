import { getGamesListAPI } from "@/apis/game";
import GameCard from "@/components/Game/GameCard";
import InnerLayout from "@/layout/InnerLayout";
import { PAGINATION_LIMIT, SITE_NAME } from "@/utils/constants";
import { dateFormat } from "@/utils/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import { Grid, Stack } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const SortComp = dynamic(() => import("@/components/common/SortComp"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const { category, sort, reverse } = context.query;
  let ordering =
    !sort || sort === "popularity"
      ? "-added"
      : sort === "released-date"
      ? "-released"
      : "-metacritic";
  if (reverse === "true") {
    ordering = ordering.replace("-", "");
  }
  let data;

  // all games
  if (!category) {
    data = await getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      ordering,
    }).then((res) => res.data);
  }
  // new games
  else if (category === "new-and-upcoming") {
    data = await getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      ordering,
      dates: `${dateFormat(dayjs().subtract(3, "month"))},${dateFormat(
        dayjs().add(6, "month")
      )}`,
    }).then((res) => res.data);
  } else if (category === "last-30-days") {
    data = await getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      ordering,
      dates: `${dateFormat(dayjs().subtract(30, "day"))},${dateFormat(
        new Date()
      )}`,
    }).then((res) => res.data);
  } else if (category === "this-week") {
    data = await getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      ordering,
      dates: `${dateFormat(dayjs().startOf("week"))},${dateFormat(
        dayjs().endOf("week")
      )}`,
    }).then((res) => res.data);
  } else if (category === "next-week") {
    data = await getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      ordering,
      dates: `${dateFormat(
        dayjs().add(1, "week").startOf("week")
      )},${dateFormat(dayjs().add(1, "week").endOf("week"))}`,
    }).then((res) => res.data);
  }
  // popular games last year
  else {
    data = await getGamesListAPI({
      page_size: PAGINATION_LIMIT,
      ordering,
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

  const title = !category
    ? "All Games"
    : category === "new-and-upcoming"
    ? "New & Upcoming Releases"
    : category === "last-30-days"
    ? "Last 30 Days Releases"
    : category === "this-week"
    ? "This Week Releases"
    : category === "next-week"
    ? "Next Week Releases"
    : `Popular In ${dayjs().subtract(1, "year").year()}`;

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
        title={title}
        titleFontSize={"2.6rem"}
        content={<SortComp />}
        img={img}
      >
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
