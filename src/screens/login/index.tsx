import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import userApi from '~/api/user.api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import userApi from '@api/userApi';
import { IconUser } from '@components/icon/Icon';
import FormLogin from './FormLogin';
import { RootState } from '@app/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Login = () => {
    const { userInfo } = useSelector((state: RootState) => state.users);
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    useEffect(() => {
        if (accessTokenFromLocalStorage !== null) {
            navigate('/');
        }
    }, [accessTokenFromLocalStorage]);

    return (
        <div className='flex justify-center bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-repeat h-screen'>
            <div className='flex flex-col items-center m-auto p-5 bg-white rounded-2xl shadow-lg w-[40%]'>
                <span className='flex items-center gap-2 justify-center'>
                    <h1 className='text-black text-3xl font-bold'>Teaching Me</h1>
                    <div className='mt-auto'>
                        <IconUser />
                    </div>
                </span>

                <div className='flex flex-col m-4 w-[70%]'>
                    <FormLogin pause={false} />
                </div>
                <span className='text-sm font-thin w-[70%] text-center pt-6'>
                    Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
                    <Link to={'/home'}>
                        <p className='font-bold cursor-pointer'>
                            Điều khoản sử dụng của chúng tôi.
                        </p>
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Login;
