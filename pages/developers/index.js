import { getDevelopersListAPI } from "@/apis/developer";
import GeneralItemCard from "@/components/common/GeneralItemCard";
import InnerLayout from "@/layout/InnerLayout";
import { SITE_NAME, PAGINATION_LIMIT } from "@/utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import { Grid, Stack } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export async function getStaticProps() {
  const developers = await getDevelopersListAPI({
    page_size: PAGINATION_LIMIT,
  }).then((res) => res.data);

  return {
    props: {
      data: developers,
    },
    revalidate: 60,
  };
}

export default function DevelopersPage({ data }) {
  const title = `Developers`;
  const router = useRouter();
  const img =
    data.results[Math.floor(Math.random() * data.results.length)]
      .image_background;

  const [developers, setDevelopers] = React.useState(data);
  const [loading, setLoading] = React.useState(false);

  function handleLoadMore() {
    setLoading(true);
    axios
      .get(developers.next)
      .then((res) => {
        const data = res.data;
        setDevelopers((prev) => ({
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
      <InnerLayout title={title} titleFontSize={"2.6rem"} img={img}>
        <Grid container spacing={2}>
          {developers.results.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
              <GeneralItemCard item={item} />
            </Grid>
          ))}
        </Grid>
        {developers.next && (
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
      </InnerLayout>
    </>
  );
}
