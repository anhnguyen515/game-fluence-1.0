import { getGameDetailAPI } from "@/apis/game";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const gameDetail = await getGameDetailAPI(slug).then((res) => res.data);
  if (gameDetail.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      gameDetail,
    },
    revalidate: 60,
  };
}

export default function GameDetailPage({ gameDetail }) {
  return (
    <Container maxWidth="2xl">
      <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
        <pre>{JSON.stringify(gameDetail, null, 2)}</pre>
      </Box>
    </Container>
  );
}
