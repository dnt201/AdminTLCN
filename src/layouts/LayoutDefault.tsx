import { Footer, Header, RightBar, SideBar } from '~/modules';

const LayoutDefault = () => {
  return (
    <div className='flex bg-gradient-to-r from-orange-400 via-red-500 to-pink-500'>
      <SideBar />
      <div className=''>Container</div>
    </div>
  );
};

export default LayoutDefault;
