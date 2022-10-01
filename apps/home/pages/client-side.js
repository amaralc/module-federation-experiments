import dynamic from "next/dynamic";

const RemoteTitle = dynamic(() => import('checkout/title'));
const RemoteCard = dynamic(() => import('shop/card'));

const New = ({title}) => {
  return (
    <div>
      Client
      <RemoteTitle/>
      <RemoteCard/>
    </div>
  )
}

export default New;
