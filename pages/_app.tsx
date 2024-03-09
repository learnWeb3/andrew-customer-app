import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { AuthenticatedLayout } from "../components/AuthenticatedLayout";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ComponentType, ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { ToastContainer } from "react-toastify";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

export type MyAppProps = AppProps & {
  Component: Page;
  emotionCache?: EmotionCache;
};

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? null;

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          {getLayout ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <AuthenticatedLayout>
              <Component {...pageProps} />
            </AuthenticatedLayout>
          )}

          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
