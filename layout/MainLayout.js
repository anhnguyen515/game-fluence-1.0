import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { Box, Container, Stack } from "@mui/material";

export default function MainLayout({ children }) {
  return (
    <>
      <Stack sx={{ minHeight: "100vh" }}>
        <Navbar />
        <Container maxWidth="xl" sx={{ flex: 1 }}>
          <Box sx={{ p: { xs: 1, md: 3 } }}>{children}</Box>
        </Container>
        <Footer />
      </Stack>
    </>
  );
}
