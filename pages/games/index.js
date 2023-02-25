import { getGamesListAPI } from "@/apis/game";
import PageHeader from "@/components/common/PageHeader";
import GameCard from "@/components/Game/GameCard";
import Navigator from "@/components/Game/Navigator";
import { dateFormat } from "@/utils/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const { category, subcategory, sort, reverse } = context.query;
  let ordering =
    !sort || sort === "popularity"
      ? "-added"
      : sort === "name"
      ? "-name"
      : sort === "released-date"
      ? "-released"
      : "-metacritic";
  if (reverse === "true") {
    ordering = ordering.replace("-", "");
  }
  let data;

  // all games
  if (!category) {
    data = await getGamesListAPI({ ordering }).then((res) => res.data);
  }
  // new games
  else if (category === "new") {
    if (subcategory === "new-and-upcoming") {
      data = await getGamesListAPI({
        ordering,
        dates: `${dateFormat(dayjs().subtract(3, "month"))},${dateFormat(
          dayjs().add(6, "month")
        )}`,
      }).then((res) => res.data);
    } else if (subcategory === "last-30-days") {
      data = await getGamesListAPI({
        ordering,
        dates: `${dateFormat(dayjs().subtract(30, "day"))},${dateFormat(
          new Date()
        )}`,
      }).then((res) => res.data);
    } else if (subcategory === "this-week") {
      data = await getGamesListAPI({
        ordering,
        dates: `${dateFormat(dayjs().startOf("week"))},${dateFormat(
          dayjs().endOf("week")
        )}`,
      }).then((res) => res.data);
    } else {
      data = await getGamesListAPI({
        ordering,
        dates: `${dateFormat(
          dayjs().add(1, "week").startOf("week")
        )},${dateFormat(dayjs().add(1, "week").endOf("week"))}`,
      }).then((res) => res.data);
    }
  }
  // popular games last year
  else {
    data = await getGamesListAPI({
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

const sortValues = [
  {
    name: "Popularity",
    value: "popularity",
  },
  {
    name: "Name",
    value: "name",
  },
  {
    name: "Released date",
    value: "released-date",
  },
  {
    name: "Metascore",
    value: "metascore",
  },
];

export default function AllGamesPage({ data }) {
  const router = useRouter();
  const { category, subcategory, sort, reverse } = router.query;

  const title = !category
    ? "All Games"
    : category === "new"
    ? subcategory === "new-and-upcoming"
      ? "New & Upcoming Releases"
      : subcategory === "last-30-days"
      ? "Last 30 Days Releases"
      : subcategory === "this-week"
      ? "This Week Releases"
      : "Next Week Releases"
    : `Popular In ${dayjs().subtract(1, "year").year()}`;

  const img =
    data.results[Math.floor(Math.random() * data.results.length)]
      .background_image;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  function handleChangeOrdering(e) {
    router.push({
      pathname: "/games",
      query: {
        ...router.query,
        sort: e.target.value,
      },
    });
  }

  function handleReverseOrder(e) {
    router.push({
      pathname: "/games",
      query: {
        ...router.query,
        reverse: e.target.checked,
      },
    });
  }

  return (
    <>
      <NextSeo
        title={title}
        canonical={router.pathname}
        openGraph={{
          url: router.asPath,
        }}
      />
      <PageHeader
        title={title}
        titleFontSize={"2.6rem"}
        content={
          <Stack alignItems={"center"} direction={"row"} gap={3}>
            <Stack alignItems={"center"} direction={"row"} spacing={-1}>
              <Typography>Sorted by</Typography>
              <Select
                onChange={handleChangeOrdering}
                size="small"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                value={sort || "popularity"}
              >
                {sortValues.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reverse === "true"}
                    onChange={handleReverseOrder}
                    size="small"
                  />
                }
                label="Reverse"
              />
            </FormGroup>
          </Stack>
        }
        subtitleFontSize={"1.2rem"}
        img={img}
      />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <Grid container spacing={2}>
            {!isSmallScreen && (
              <Grid item xs={12} md={2} sx={{ position: "relative" }}>
                <Navigator category={category} subcategory={subcategory} />
              </Grid>
            )}

            <Grid item container spacing={2} xs={12} md={10}>
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
