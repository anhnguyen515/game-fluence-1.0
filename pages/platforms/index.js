import { getPlatformsListAPI } from "@/apis/platform";
import PageHeader from "@/components/common/PageHeader";
import { Box, Container } from "@mui/material";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const platforms = await getPlatformsListAPI().then((res) => res.data);

  return {
    props: {
      platforms,
    },
    revalidate: 60,
  };
}

export default function PlatformsPage({ platforms }) {
  const title = "Platforms";
  const router = useRouter();
  const img =
    platforms.results[Math.floor(Math.random() * platforms.results.length)]
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
          <pre>{JSON.stringify(platforms, null, 2)}</pre>
        </Box>
      </Container>
    </>
  );
}
