import { getPublishersListAPI } from "@/apis/publisher";
import PageHeader from "@/components/common/PageHeader";
import PublisherCard from "@/components/Publisher/PublisherCard";
import { SITE_NAME } from "@/utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Stack } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export async function getStaticProps() {
  const publishers = await getPublishersListAPI({ page_size: 20 }).then(
    (res) => res.data
  );

  return {
    props: {
      data: publishers,
    },
    revalidate: 60,
  };
}

export default function GenresPage({ data }) {
  const title = `Publishers`;
  const router = useRouter();
  const img =
    data.results[Math.floor(Math.random() * data.results.length)]
      .image_background;

  const [publishers, setPublishers] = React.useState(data);
  const [loading, setLoading] = React.useState(false);

  function handleLoadMore() {
    setLoading(true);
    axios
      .get(publishers.next)
      .then((res) => {
        const data = res.data;
        setPublishers((prev) => ({
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
      <PageHeader title={title} titleFontSize={"2.6rem"} img={img} />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <Grid container spacing={2}>
            {publishers.results.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <PublisherCard publisher={item} />
              </Grid>
            ))}
          </Grid>
          {publishers.next && (
            <Stack alignItems={"center"} mt={3} sx={{ width: "100%" }}>
              <LoadingButton
                loading={loading}
                onClick={handleLoadMore}
                size="large"
                startIcon={<ExpandMoreIcon />}
              >
                Load More
              </LoadingButton>
            </Stack>
          )}
        </Box>
      </Container>
    </>
  );
}
