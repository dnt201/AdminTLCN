import { useState } from 'react';
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
    { title: 'Dashboard' },
    {
      title: 'Pages',
      icon: <IconPage />,
      submenu: true,
      submenuItems: [{ title: 'Submenu 1' }, { title: 'Submenu 2' }, { title: 'Submenu 3' }],
    },
    { title: 'Users', icon: <IconUser /> },
    { title: 'Blogs', icon: <IconBlog /> },
    { title: 'Courses' },
    { title: 'Comments' },
    { title: 'Analytic' },
    { title: 'Setting' },
  ];
  const [submenuOpen, setSubmenuOpen] = useState(false);
  return (
    <div className='bg-white h-screen rounded-xl m-4 w-72'>
      <div className='flex justify-center p-10'>
        <Logo />
        <h1 className='text-sm font-OpenSans font-bold'>Teaching Me</h1>
      </div>
      <hr className='mx-6 border-1.5 border-gray-c2' />
      <div className='px-6'>
        <ul className='pt-2'>
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className='text-black text-sm flex font-OpenSans items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-c2 rounded-md mt-2'
              >
                <span className='text-2l block float-left'>
                  {menu.icon ? menu.icon : <IconDashboard />}
                </span>
                <span className='text-base font-OpenSans font-medium flex-1 duration-200'>
                  {menu.title}
                </span>
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
      <div className='bottom'>
        <span>Test</span>
        <span>Test</span>
      </div>
    </div>
  );
};

export default SideBar;
