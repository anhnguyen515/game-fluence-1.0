import { getGenresListAPI } from "@/apis/genre";
import PageHeader from "@/components/common/PageHeader";
import GenreCard from "@/components/Genre/GenreCard";
import { Box, Container, Grid } from "@mui/material";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const genres = await getGenresListAPI().then((res) => res.data);

  return {
    props: {
      genres,
    },
    revalidate: 60,
  };
}

export default function GenresPage({ genres }) {
  const title = "Genres";
  const router = useRouter();
  const img =
    genres.results[Math.floor(Math.random() * genres.results.length)]
      .image_background;
  return (
    <>
      <NextSeo
        title={title}
        canonical={router.pathname}
        openGraph={{
          url: router.asPath,
        }}
      />
      <PageHeader title={title} titleFontSize={"2.4rem"} img={img} />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <pre>{JSON.stringify(genres, null, 2)}</pre>
          <Grid container spacing={2}>
            {genres.results.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <GenreCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
