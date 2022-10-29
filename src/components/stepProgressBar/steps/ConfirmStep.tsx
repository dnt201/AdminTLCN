import { useStepperContext } from '~/contexts/StepperContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';

const ConfirmStep = () => {
    const { userData, setUserData } = useStepperContext();
    const [isConfirm, setIsConfirm] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        console.log(userData);
    };
    const handleClickConfirm = () => {
        setIsConfirm(true);
        setUserData({});
    };

    useEffect(() => {
        setTimeout(() => {
            setIsConfirm(true);
        }, 2000);
    }, []);

    return (
        <div>
            {!isConfirm ? (
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <div className='flex flex-col '>
                    <div className='mx-2 w-full flex-1'>
                        <div className='mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500'>
                            Test
                        </div>
                        <div className='my-2 flex rounded border border-gray-200 bg-white p-1'>
                            <input
                                onChange={handleChange}
                                name='test'
                                value={userData?.test || ''}
                                placeholder='Test'
                                className='w-full appearance-none p-1 px-2 text-gray-800 outline-none'
                            />
                        </div>
                    </div>
                    <button
                        className='cursor-pointer rounded-lg m-6 bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white'
                        onClick={() => handleClickConfirm()}
                    >
                        Confirm
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConfirmStep;
