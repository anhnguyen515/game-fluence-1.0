import { Container } from "@mui/material";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <main>
      <Container maxWidth="xl">{children}</Container>
    </main>
  );
}
