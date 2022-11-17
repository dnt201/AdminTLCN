import { Breadcrumb } from 'flowbite-react';
import BreadcrumbItem from 'flowbite-react/lib/esm/components/Breadcrumb/BreadcrumbItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbTest from '~/components/breadcrumb/BreadcrumbTest';
import { IconNotification, IconSearch, IconSetting, IconSignIn } from '~/components/icon/Icon';

const Navbar = () => {
    const [crumbs, setCrumbs] = useState(['Home', 'Category', 'Users', 'Posts']);
    const selected = (crumb: any) => {
        console.log(crumb);
    };
    return (
        <>
            <div className='flex h-8 bg-transparent mt-3 justify-between'>
                {/* <Breadcrumb
                    aria-label='Default breadcrumb example'
                    className='px-5 bg-gray-50 dark:bg-gray-800 text-base text-white'
                >
                    <BreadcrumbItem href='#'>Home</BreadcrumbItem>
                    <BreadcrumbItem href='#'>Page</BreadcrumbItem>
                    <BreadcrumbItem>Users</BreadcrumbItem>
                </Breadcrumb> */}
                <BreadcrumbTest crumbs={crumbs} selected={selected} />
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
