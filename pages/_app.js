import MainLayout from "@/layout/MainLayout";
import "@/styles/globals.css";
import { defaultTheme } from "@/styles/theme";
import { OG_TITLE, SITE_BASE_URL, SITE_NAME } from "@/utils/constants";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import "@fontsource/roboto";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <DefaultSeo
        title={SITE_NAME}
        canonical={SITE_BASE_URL}
        description={"Your nice & cozy gaming review platform"}
        openGraph={{
          type: "website",
          siteName: SITE_NAME,
          title: OG_TITLE,
          url: SITE_BASE_URL,
          images: [],
        }}
      />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
