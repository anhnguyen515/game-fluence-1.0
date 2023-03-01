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
          <link
            rel="icon"
            type="image/png"
            sizes="250x181"
            href="/img/icon-white-250px.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="250x181"
            href="/img/icon-black-250px.png"
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
                url: `${SITE_BASE_URL}img/GameFluence-black-2000px.png`,
                width: 1200,
                height: 503,
                alt: `${SITE_NAME} black logo`,
                type: "image/png",
              },
              {
                url: `${SITE_BASE_URL}img/GameFluence-white-2000px.png`,
                width: 1200,
                height: 503,
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
    </>
  );
}

export default wrapper.withRedux(MyApp);
