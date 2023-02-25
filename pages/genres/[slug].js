import { getGenreDetailAPI } from "@/apis/genre";
import PageHeader from "@/components/common/PageHeader";
import { SITE_NAME } from "@/utils/constants";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import ReadMore from "@/components/common/ReadMore";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const genreDetail = await getGenreDetailAPI(slug).then((res) => res.data);
  if (genreDetail.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genreDetail,
    },
    revalidate: 60,
  };
}

export default function GenreDetailPage({ genreDetail }) {
  const title = `${genreDetail.name} Games`;
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
            <ReadMore paragraph={parse(genreDetail.description)} />
          </Box>
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
            <Grid item xs={12} md={8}>
              asdasds
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
