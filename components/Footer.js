import { Box, Container } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "secondary.main",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ p: { xs: 1, md: 3 } }}>Footer</Box>
      </Container>
    </Box>
  );
}
