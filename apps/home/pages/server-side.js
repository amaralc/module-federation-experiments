import dynamic from "next/dynamic";
import Head from "next/head";

const RemoteTitle = dynamic(() => import('checkout/title'));
const RemoteCard = dynamic(() => import('shop/card'));

export const getServerSideProps = () => {
  return {
    props: {
      title: 'SSR'
    }
  }
};

const New = ({title}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
        <RemoteTitle/>
        <RemoteCard/>
    </div>
  )
}

export default New;
