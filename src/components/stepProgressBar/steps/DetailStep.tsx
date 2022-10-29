import React from 'react';
import { useStepperContext } from '~/contexts/StepperContext';

const DetailStep = () => {
    const { userData, setUserData } = useStepperContext();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className='flex flex-col '>
            <div className='mx-2 w-full flex-1'>
                <div className='mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500'>
                    Address
                </div>
                <div className='my-2 flex rounded border border-gray-200 bg-white p-1'>
                    <input
                        onChange={handleChange}
                        name='address'
                        value={userData?.address || ''}
                        placeholder='Address'
                        className='w-full appearance-none p-1 px-2 text-gray-800 outline-none'
                    />
                </div>
            </div>
            <div className='mx-2 w-full flex-1'>
                <div className='mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500'>
                    Phone
                </div>
                <div className='my-2 flex rounded border border-gray-200 bg-white p-1'>
                    <input
                        onChange={handleChange}
                        value={userData?.phone || ''}
                        name='phone'
                        placeholder='Phone'
                        type='phone'
                        className='w-full appearance-none p-1 px-2 text-gray-800 outline-none'
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailStep;
