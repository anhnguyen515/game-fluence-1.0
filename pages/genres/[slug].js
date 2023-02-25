import { getGamesListAPI } from "@/apis/game";
import { getGenreDetailAPI } from "@/apis/genre";
import PageHeader from "@/components/common/PageHeader";
import ReadMore from "@/components/common/ReadMore";
import GameCard from "@/components/Game/GameCard";
import { SITE_NAME } from "@/utils/constants";
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
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

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

  const [genreDetail, genreGames] = await Promise.all([
    getGenreDetailAPI(slug).then((res) => res.data),
    getGamesListAPI({ ordering, genres: slug }).then((res) => res.data),
  ]);
  if (genreDetail.detail || genreGames.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genreDetail,
      genreGames,
    },
  };
}

const sortValues = [
  {
    name: "Popularity",
    value: "popularity",
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

export default function GenreDetailPage({ genreDetail, genreGames }) {
  const title = `${genreDetail.name} Games`;
  const router = useRouter();
  const { slug, ...queries } = router.query;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [games, setGames] = React.useState(genreGames);
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
      pathname: `/genres/${slug}`,
      query: {
        ...queries,
        sort: e.target.value,
      },
    });
  }

  function handleReverseOrder(e) {
    router.push({
      pathname: `/genres/${slug}`,
      query: {
        ...queries,
        reverse: e.target.checked,
      },
    });
  }

  return (
    <>
      <NextSeo
        title={`${title} - ${SITE_NAME}`}
        canonical={router.pathname}
        openGraph={{ url: router.asPath }}
      />
      <PageHeader
        title={title}
        titleFontSize={"2.6rem"}
        subtitle={
          <Box>
            <ReadMore paragraph={genreDetail.description} />
          </Box>
        }
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
                value={queries.sort || "popularity"}
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
                    checked={queries.reverse === "true"}
                    onChange={handleReverseOrder}
                    size="small"
                  />
                }
                label="Reverse"
              />
            </FormGroup>
          </Stack>
        }
        img={genreDetail.image_background}
      />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <Grid container spacing={2}>
            {!isSmallScreen && (
              <Grid item xs={12} md={2}>
                asdasd
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
