import { getGameDetailAPI } from "@/apis/game";
import PageHeader from "@/components/common/PageHeader";
import { SITE_NAME } from "@/utils/constants";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const GamesNavigator = dynamic(
  () => import("@/components/Game/GamesNavigator"),
  { ssr: false }
);

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <NextSeo
        title={`${title} - ${SITE_NAME}`}
        canonical={router.pathname.replace("[slug]", slug)}
        openGraph={{ url: router.asPath }}
      />
      <PageHeader
        title={title}
        titleFontSize={"3.2rem"}
        img={gameDetail.background_image}
      />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
          <Grid container spacing={2}>
            {!isSmallScreen && (
              <Grid item xs={12} md={2.4} lg={2}>
                <GamesNavigator />
              </Grid>
            )}
            <Grid item xs={12} md={9.6} lg={10}>
              <pre>{JSON.stringify(gameDetail, null, 2)}</pre>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
