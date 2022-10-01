import dynamic from "next/dynamic";

const RemoteTitle = dynamic(() => import('checkout/title'));
const RemoteCard = dynamic(() => import('shop/card'));

export const getServerSideProps = () => {
  return {
    props: {
      title: 'hello'
    }
  }
};

const New = ({title}) => {
  return (
    <div>
      {title}
        <RemoteTitle/>
        <RemoteCard/>
    </div>
  )
}

export default New;
