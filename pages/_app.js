import '../styles/common.scss';
import Layout from '../src/layouts/default-layout';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Web Single Sign-on</title>
        <meta name="description" content="New Authorization Format" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
