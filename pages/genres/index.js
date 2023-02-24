import { getGenresListAPI } from "@/apis/genre";
import { Box, Container } from "@mui/material";
import React from "react";

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
  return (
    <Container maxWidth="2xl">
      <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
        <pre>{JSON.stringify(genres, null, 2)}</pre>
      </Box>
    </Container>
  );
}
