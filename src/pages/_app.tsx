import Head from "next/head";
import "../../styles/globals.css";
import { AppProps } from "next/app";
import { CustomApolloProvider } from "../infrastructure/lib/apollo-provider";
import { ThemeProvider } from "../presentation/components/theme-provider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='application-name' content="Charityvest PWA" />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content="Charityvest Progressive Web App" />
        <meta name='description' content="Charityvest Progressive Web App"  />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name="description" content="Charityvest Progressive Web App" />
        <meta name="keywords" content="Keywords" />
        <title>Charityvest PWA</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <CustomApolloProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </CustomApolloProvider>
    </>
  );
}
