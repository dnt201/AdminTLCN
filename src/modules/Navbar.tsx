import { Link } from 'react-router-dom';
import { IconNotification, IconSearch, IconSetting, IconSignIn } from '~/components/icon/Icon';

const Navbar = () => {
    return (
        <>
            <div className='flex h-8 bg-transparent mt-3 justify-between'>
                <span>Pages/User</span>
                <div className='flex'>
                    <div className='flex bg-white rounded-lg p-2 items-center'>
                        <span className='cursor-pointer px-2'>
                            <IconSearch />
                        </span>
                        <input type='text' className='outline-none' />
                    </div>
                    <Link to={'/login'} className='flex items-center p-2 cursor-pointer'>
                        <span>
                            <IconSignIn />
                        </span>
                        <span className='text-white p-1.5'>Sign-in</span>
                    </Link>
                    <div className='flex items-center'>
                        <span className='p-2 cursor-pointer'>
                            <IconSetting />
                        </span>
                        <span className='p-2 cursor-pointer'>
                            <IconNotification />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
