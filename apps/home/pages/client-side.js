import dynamic from "next/dynamic";
import Head from "next/head";

const RemoteTitle = dynamic(() => import('checkout/title'));
const RemoteCard = dynamic(() => import('shop/card'));

const New = () => {
  return (
    <div>
      <Head>
        <title>CSR</title>
      </Head>
      <RemoteTitle/>
      <RemoteCard/>
    </div>
  )
}

export default New;
