import { getPlatformsListAPI } from "@/apis/platform";
import { Box, Container } from "@mui/material";

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
  return (
    <Container maxWidth="2xl">
      <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
        <pre>{JSON.stringify(platforms, null, 2)}</pre>
      </Box>
    </Container>
  );
}
