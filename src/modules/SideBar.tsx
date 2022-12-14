import {
    IconArrowUp,
    IconBlog,
    IconDashboard,
    IconCategory,
    IconUser,
    IconCourse,
    IconComment,
    IconAnalytic,
    IconArrowDown,
    IconSetting,
} from '@components/icon/Icon';
import React, { useState } from 'react';
import Logo from '@components/logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';
import { userLogout } from '@redux/userSlice';
import { toast } from 'react-toastify';

const SideBar = () => {
    const Menus = [
        { title: 'Dashboard', link: '/home' },
        { title: 'Users', link: '/update', icon: <IconUser /> },
        {
            title: 'Posts',
            link: '/posts',
            icon: <IconBlog />,
        },
        { title: 'Tag', link: '/tags', icon: <IconCourse /> },
        { title: 'Category', link: '/categories', icon: <IconCategory /> },
        { title: 'Comments', link: '/update', icon: <IconComment /> },
        {
            title: 'Analysis',
            link: '/update',
            icon: <IconAnalytic />,
            submenu: true,
            submenuItems: [
                { id: 0, title: 'Users', link: '/user' },
                { id: 1, title: 'Posts', link: '/post' },
                { id: 2, title: 'Comments', link: '/comment' },
            ],
        },
    ];
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const logoutHandle = async () => {
        const result = await dispatch(userLogout());
        if (result.payload === 200) {
            toast.success('Đăng xuất thành công!', {
                autoClose: 1000,
            });
        } else {
            localStorage.clear();
            console.log(result);
        }
        navigate('/login');
        console.log(result);
    };
    const [submenuOpen, setSubmenuOpen] = useState(false);
    return (
        <div
            className='bg-white h-screen rounded-xl  w-1/5
        fixed  invisible overflow-y-auto hover:visible   pt-6  group
        '
        >
            <div className='flex flex-col visible border-gray-c2  border-r-[1px]  '>
                <div className=' flex justify-center gap-1 items-center mb-1 '>
                    <Logo />
                    <Link to={'/home'}>
                        <h1 className='text-sm  font-OpenSans font-bold'>Teaching Me</h1>
                    </Link>
                </div>
                <hr className='mx-6 border-1.5 border-gray-c2' />
                <div className=''>
                    <ul className='pt-2'>
                        {Menus.map((menu, index) => (
                            <React.Fragment key={menu.title}>
                                <li
                                    onClick={() => {
                                        if (menu.link === '/update')
                                            toast.warning(
                                                'Tính năng đang được cập nhập! Vui lòng thử lại sau!',
                                                { autoClose: 2000 },
                                            );
                                        else navigate(menu.link);
                                    }}
                                    key={index}
                                    className={
                                        'text-black text-sm flex font-OpenSans items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-c2 rounded-md mt-2 justify-between' +
                                        (window.location.pathname.search(menu.link) === 0 &&
                                            ' bg-gray-c2 rounded-none hover:bg-gray-c2')
                                    }
                                >
                                    <span className={'flex items-center  '}>
                                        <span className='text-2l block float-left'>
                                            {menu.icon ? menu.icon : <IconDashboard />}
                                        </span>
                                        <span className='text-base font-OpenSans font-medium flex-1 duration-200'>
                                            {menu.title}
                                        </span>
                                    </span>

                                    {menu.submenu && (
                                        <span onClick={() => setSubmenuOpen(!submenuOpen)}>
                                            {!submenuOpen ? <IconArrowDown /> : <IconArrowUp />}
                                        </span>
                                    )}
                                </li>
                                {menu.submenu && submenuOpen && (
                                    <ul>
                                        {menu.submenuItems.map((submenuItem) => (
                                            <Link
                                                to={`analysis/${submenuItem.link}`}
                                                key={submenuItem.id}
                                            >
                                                <li className='text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-c2 rounded-md'>
                                                    {submenuItem.title}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </React.Fragment>
                        ))}
                        <div className='flex-1 h-[1px] border-t-[1px] border-gray-c3'></div>
                        <li
                            onClick={() => {
                                logoutHandle();
                            }}
                            className='text-black text-base flex justify-center font-OpenSans items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-c2  '
                        >
                            <span className='text-base font-OpenSans text-danger  text-center font-medium flex-1 duration-200'>
                                Log out
                            </span>
                        </li>
                    </ul>
                </div>
                <div className='p-4 flex flex-col'></div>
            </div>
        </div>
    );
};

export default SideBar;
