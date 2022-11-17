import { Outlet } from 'react-router-dom';
import { Footer, Navbar, SideBar } from '~/modules';

const LayoutDefault = () => {
    return (
        <div className='flex bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-repeat'>
            <div className='flex-initial w-[25%]'>
                <SideBar />
            </div>
            <div className='flex flex-col w-full'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default LayoutDefault;
