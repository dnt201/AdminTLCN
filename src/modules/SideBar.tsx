import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowDown,
  IconArrowUp,
  IconBlog,
  IconDashboard,
  IconPage,
  IconUser,
} from '~/components/icon/Icon';
import Logo from '~/components/logo/Logo';

const SideBar = () => {
  const Menus = [
    { title: 'Dashboard', link: '/home' },
    {
      title: 'Pages',
      link: '/users',
      icon: <IconPage />,
      submenu: true,
      submenuItems: [{ title: 'Submenu 1' }, { title: 'Submenu 2' }, { title: 'Submenu 3' }],
    },
    { title: 'Users', link: 'users', icon: <IconUser /> },
    {
      title: 'Blogs',
      link: 'blogs',
      icon: <IconBlog />,
    },
    { title: 'Courses', link: 'courses' },
    { title: 'Comments', link: 'comments' },
    { title: 'Analytic', link: 'analytic' },
    { title: 'Setting', link: 'setting' },
  ];
  const [submenuOpen, setSubmenuOpen] = useState(false);
  return (
    <div className='bg-white h-fit rounded-xl m-4 w-60'>
      <div className='flex justify-center p-10'>
        <Logo />
        <Link to={'/home'}>
          <h1 className='text-sm font-OpenSans font-bold'>Teaching Me</h1>
        </Link>
      </div>
      <hr className='mx-6 border-1.5 border-gray-c2' />
      <div className='px-6'>
        <ul className='pt-2'>
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className='text-black text-sm flex font-OpenSans items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-c2 rounded-md mt-2 justify-between'
              >
                <Link to={menu.link} className='flex items-center'>
                  <span className='text-2l block float-left'>
                    {menu.icon ? menu.icon : <IconDashboard />}
                  </span>
                  <span className='text-base font-OpenSans font-medium flex-1 duration-200'>
                    {menu.title}
                  </span>
                </Link>

                {menu.submenu && (
                  <span onClick={() => setSubmenuOpen(!submenuOpen)}>
                    {!submenuOpen ? <IconArrowDown /> : <IconArrowUp />}
                  </span>
                )}
              </li>
              {menu.submenu && submenuOpen && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <li
                      key={index}
                      className='text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-c2 rounded-md'
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      <hr className='mx-6 border-1.5 border-gray-c2' />
      <div className='p-6 flex flex-col'>
        <ul>
          <li>Troi oi</li>
          <li>Troi oi</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
