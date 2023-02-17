import MainLayout from "@/layout/MainLayout";
import "@/styles/globals.css";
import { defaultTheme } from "@/styles/theme";
import { OG_TITLE, SITE_BASE_URL, SITE_NAME } from "@/utils/constants";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import "@fontsource/roboto";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { Provider } from "react-redux";
import { wrapper } from "@/store/store";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <CacheProvider value={cache}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          key="viewport"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link
          rel="icon"
          type="image/png"
          sizes="250x250"
          href="/img/logo-white-250px.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="250x250"
          href="/img/logo-black-250px.png"
        />
      </Head>
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
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
