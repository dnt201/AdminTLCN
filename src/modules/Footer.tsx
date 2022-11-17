const Footer = () => {
    return (
        <div className='flex  justify-between p-4 m-4'>
            <span className='text-base font-normal flex'>
                {' '}
                2022, made with Love by{' '}
                <p className='font-bold mx-1'> ThanhTrong - Minh Duc - Duy Nha</p> for a better web.
            </span>
            <div className='flex justify-between mx-5'>
                <span className='mx-2 text-lg font-semibold cursor-pointer'>Team</span>
                <span className='mx-2 text-lg font-semibold cursor-pointer'>About Us</span>
                <span className='mx-2 text-lg font-semibold cursor-pointer'>Blog</span>
            </div>
        </div>
    );
};

export default Footer;
