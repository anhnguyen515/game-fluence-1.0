import { Container } from "@mui/material";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
}
