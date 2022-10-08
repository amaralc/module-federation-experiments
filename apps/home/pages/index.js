import dynamic from 'next/dynamic';
import {Suspense} from 'react';
import Head from 'next/head';
import Link from 'next/link';

const RemoteTitle = dynamic(() => import('checkout/title'), {suspense: true});
const RemoteCard = dynamic(() => import('shop/card'), {suspense: true});

export const getStaticProps = () => {
  return {
    props: {
      title: 'SSG'
    }
  }
}


const Home = ({title}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className="hero">
        <div>
          <Link href={'/server-side'}>SSR</Link>
        </div>
        <div>
          <Link href={'/client-side'}>CSR</Link>
        </div>
        <Suspense>
          <RemoteTitle/>
        </Suspense>
        <Suspense>
          <RemoteCard/>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;

