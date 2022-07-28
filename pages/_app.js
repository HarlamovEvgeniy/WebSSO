import '../styles/common.scss';
import Layout from '../src/layouts/default-layout';
import Head from 'next/head';
import { NextQueryParamProvider } from 'next-query-params';

export default function App({ Component, pageProps }) {
  return (
    <NextQueryParamProvider>
      <Layout>
        <Head>
          <title>Web Single Sign-on</title>
          <meta name="description" content="New Authorization Format" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NextQueryParamProvider>
  )
}
