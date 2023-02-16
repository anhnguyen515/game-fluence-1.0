import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { Box, Container, Stack } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function MainLayout({ children }) {
  return (
    <>
      <Stack sx={{ minHeight: "100vh" }}>
        <Navbar />
        <Container maxWidth="2xl" sx={{ flex: 1 }}>
          <Box sx={{ p: { xs: 1, md: 3 } }}>{children}</Box>
        </Container>
        <Footer />
      </Stack>
      <ScrollToTop component={<KeyboardArrowUpIcon />} smooth />
    </>
  );
}
