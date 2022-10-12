import dynamic from "next/dynamic";
import Head from "next/head";

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
        <RemoteCard/>
    </div>
  )
}

export default New;
