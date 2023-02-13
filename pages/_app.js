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
        description={"Your nice & cozy video games platform"}
        openGraph={{
          type: "website",
          siteName: SITE_NAME,
          title: OG_TITLE,
          url: SITE_BASE_URL,
          images: [
            {
              url: `${SITE_BASE_URL}img/GameFluence-black-2000px.png`,
              width: 1200,
              height: 502.8,
              alt: `${SITE_NAME} black logo`,
              type: "image/png",
            },
            {
              url: `${SITE_BASE_URL}img/GameFluence-white-2000px.png`,
              width: 1200,
              height: 502.8,
              alt: `${SITE_NAME} white logo`,
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
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
