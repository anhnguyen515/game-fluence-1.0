import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { Box, Container, Stack } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";

export default function MainLayout({ children }) {
  const themeStore = useSelector(selectTheme);
  return (
    <>
      <Stack sx={{ minHeight: "100vh" }}>
        <Navbar />
        {/* <Container maxWidth="2xl" sx={{ flex: 1 }}>
          <Box sx={{ px: { xs: 1, md: 3 } }}>{children}</Box>
        </Container> */}
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Footer />
      </Stack>
      <ScrollToTop
        component={<KeyboardArrowUpIcon />}
        smooth
        style={{
          backgroundColor: getTheme(themeStore).theme.palette.background.paper,
        }}
      />
    </>
  );
}
