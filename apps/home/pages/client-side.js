import dynamic from "next/dynamic";
import Head from "next/head";

const RemoteCard = dynamic(() => import('shop/card'));

const New = () => {
  return (
    <div>
      <Head>
        <title>CSR</title>
      </Head>
      <RemoteCard/>
    </div>
  )
}

export default New;
