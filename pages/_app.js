import MainLayout from "@/layout/MainLayout";
import { selectTheme, setTheme } from "@/store/slices/themeSlice";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import { OG_TITLE, SITE_BASE_URL, SITE_NAME } from "@/utils/constants";
import createEmotionCache from "@/utils/createEmotionCache";
import { getTheme } from "@/utils/utils";
import { CacheProvider } from "@emotion/react";
import "@fontsource/roboto";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps, router } = props;

  const themeStore = useSelector(selectTheme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const data = Cookies.get("theme");
    if (data !== undefined) {
      dispatch(setTheme(data));
    }
  }, []);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            key="viewport"
          />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="theme-color"
            content={getTheme(themeStore).theme.palette.background.default}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="250x250"
            href="/favicon/icon-white-250px.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="180x180"
            href="/favicon/icon-white-180px.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/icon-white-192px.png"
          />
        </Head>
        <DefaultSeo
          title={SITE_NAME}
          canonical={SITE_BASE_URL}
          description={"Everything you need for video games is here"}
          openGraph={{
            type: "website",
            siteName: SITE_NAME,
            title: OG_TITLE,
            url: SITE_BASE_URL,
            images: [
              {
                url: `${SITE_BASE_URL}img/og-white-1200px.png`,
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
        <NextNProgress
          color={getTheme(themeStore).theme.palette.primary.main}
          startPosition={0.1}
          showOnShallow={false}
          options={{
            showSpinner: false,
          }}
        />
        <Provider store={store}>
          <ThemeProvider theme={getTheme(themeStore).theme}>
            <CssBaseline />
            <MainLayout>
              <Component {...pageProps} key={router.asPath} />
            </MainLayout>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
      <Analytics />
    </>
  );
}

export default wrapper.withRedux(MyApp);
