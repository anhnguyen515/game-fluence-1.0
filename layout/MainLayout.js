import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";

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
        className="scroll-to-top"
        component={
          <KeyboardArrowUpIcon
            sx={{
              color: getTheme(themeStore).theme.palette.primary.main,
            }}
          />
        }
        smooth
        style={{
          backgroundColor:
            getTheme(themeStore).theme.palette.background.default,
          border: `2px solid ${
            getTheme(themeStore).theme.palette.primary.main
          }`,
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        theme={getTheme(themeStore).theme.palette.mode}
      />
    </>
  );
}
