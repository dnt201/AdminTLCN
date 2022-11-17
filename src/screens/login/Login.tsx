import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '~/api/user.api';
import { IconUser } from '~/components/icon/Icon';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const navigate = useNavigate();
    const loginHandler = async (email: string, password: string) => {
        const data: any = await userApi.login(email, password);

        if (data.response?.status === 401) {
            toast.error('Email or password has been wrong!', {
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        } else {
            toast.success('Login Success!', {
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
            sessionStorage.setItem('user', email);
            sessionStorage.setItem('token', data.accessToken);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            navigate('/home');
        }
    };
    return (
        <div className='flex bg-transparent w-full h-full'>
            {/* <div className='flex flex-col items-center m-auto p-5 bg-white rounded-2xl shadow-lg'>
                <IconUser />
                <Link to={'/home'}>
                    <h1 className='text-black text-3xl font-bold'>Teaching Me</h1>
                </Link>

                <div className='flex flex-col m-4 w-[70%]'>
                    <input
                        ref={emailInput}
                        onChange={(event) => setEmail(event.target.value)}
                        type='text'
                        name='email'
                        placeholder='Tên đăng nhập'
                        className='border border-gray-c3 px-2 py-3 m-2 rounded-lg'
                    />
                    <input
                        ref={passwordInput}
                        onChange={(event) => setPassword(event.target.value)}
                        type='password'
                        name='password'
                        placeholder='Mật khẩu'
                        className='border border-gray-c3 px-2 py-3 m-2 rounded-lg'
                    />
                </div>
                <button
                    className='transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110 border border-gray-c3 p-2 rounded-xl bg-warning text-white text-lg font-semibold'
                    type='submit'
                    onClick={() => loginHandler(email, password)}
                >
                    Đăng nhập
                </button>
                
            </div> */}
            <form
                className='flex flex-col items-center m-auto p-5 bg-white rounded-2xl shadow-lg w-[40%]'
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    loginHandler(data.email, data.password);
                })}
            >
                <IconUser />
                <Link to={'/home'}>
                    <h1 className='text-black text-3xl font-bold'>Teaching Me</h1>
                </Link>

                <div className='flex flex-col m-4 w-[70%]'>
                    <input
                        {...register('email', { required: 'This is required.' })}
                        type='text'
                        name='email'
                        placeholder='Tên đăng nhập'
                        className='border border-gray-c3 px-2 py-3 m-2 rounded-lg'
                    />
                    <p className='text-base text-danger font-bold'>{errors.email?.message}</p>
                    <input
                        {...register('password', { required: 'This is required', minLength: 6 })}
                        type='password'
                        name='password'
                        placeholder='Mật khẩu'
                        className='border border-gray-c3 px-2 py-3 m-2 rounded-lg'
                    />
                    <p className='text-base text-danger font-bold'>{errors.password?.message}</p>
                </div>
                <button
                    className='transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110 border border-gray-c3 p-2 rounded-xl bg-warning text-white text-lg font-semibold'
                    type='submit'
                >
                    Đăng nhập
                </button>
                <span className='text-sm font-thin w-[70%] text-center pt-6'>
                    Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
                    <Link to={'/home'}>
                        <p className='font-bold cursor-pointer'>
                            Điều khoản sử dụng của chúng tôi.
                        </p>
                    </Link>
                </span>
            </form>
        </div>
    );
}

export default Login;
