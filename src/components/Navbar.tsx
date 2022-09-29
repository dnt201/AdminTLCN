import '../styles/Navbar.css';
export const Navbar = () => {
  return (
    <>
      <div className='flex justify-between items-center py-4 bg-zinc-900'>
        <div className='flex ml-10 cursor-pointer'>
          <i className='fas fa-drafting-compass fa-2x text-orange-500'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 40 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='40' height='40' rx='7' fill='#FF4401' />
              <g clip-path='url(#clip0_3955_768)'>
                <path
                  d='M29.3441 17.5198L20.8801 10.3395C20.639 10.121 20.3253 10 19.9999 10C19.6746 10 19.3609 10.121 19.1198 10.3395L10.6567 17.5199C10.45 17.7071 10.2849 17.9355 10.1718 18.1905C10.0588 18.4454 10.0004 18.7211 10.0004 19V29.3357C10.0004 29.5119 10.0704 29.6808 10.1949 29.8054C10.3195 29.93 10.4884 30 10.6646 30L16.0004 30C16.5527 30 17.0004 29.5523 17.0004 29V25C17.0004 24.436 17.5525 23.9788 18.1167 23.9788H21.8832C22.4475 23.9788 23.0004 24.436 23.0004 25V29C23.0004 29.5523 23.4481 30 24.0004 30H29.3362C29.5124 30 29.6813 29.93 29.8059 29.8054C29.9304 29.6808 30.0004 29.5119 30.0004 29.3357V19C30.0004 18.7211 29.9419 18.4454 29.8289 18.1904C29.7159 17.9355 29.5507 17.7071 29.3441 17.5198Z'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_3955_768'>
                  <rect width='20' height='20' fill='white' transform='translate(10 10)' />
                </clipPath>
              </defs>
            </svg>
          </i>
          <span className='ml-1 text-3xl text-blue-200 font-semibold'>TeachingMe</span>
        </div>
        <i className='fas fa-bars fa-2x visible md:invisible mr-10 md:mr-0 text-blue-200 cursor-pointer'></i>
        <ul className='hidden md:flex overflow-x-hidden mr-10 font-semibold'>
          <li className='mr-6 p-1 border-b-2 border-orange-500'>
            <a className='text-blue-200 cursor-default' href='#'>
              Home
            </a>
          </li>
          <li className='mr-6 p-1'>
            <a className='text-white hover:text-blue-300' href='#'>
              Services
            </a>
          </li>
          <li className='mr-6 p-1'>
            <a className='text-white hover:text-blue-300' href='#'>
              Projects
            </a>
          </li>
          <li className='mr-6 p-1'>
            <a className='text-white hover:text-blue-300' href='#'>
              Team
            </a>
          </li>
          <li className='mr-6 p-1'>
            <a className='text-white hover:text-blue-300' href='#'>
              About
            </a>
          </li>
          <li className='mr-6 p-1'>
            <a className='text-white hover:text-blue-300' href='#'>
              Contacts
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
