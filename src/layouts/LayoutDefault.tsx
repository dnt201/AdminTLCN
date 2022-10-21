import { Link, Outlet } from 'react-router-dom';
import { IconClient, IconGlobalUser, IconMoney, IconSale } from '~/components/icon/Icon';
import Widget from '~/components/widget/Widget';
import { Footer, Navbar, SideBar } from '~/modules';
import Chart from 'react-apexcharts';

const LayoutDefault = () => {
  return (
    <div className='flex bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-repeat w-full h-full'>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDefault;
