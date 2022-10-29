import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '~/api/user.api';
import { IconUser } from '~/components/icon/Icon';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailInput = useRef<any>(null);
    const passwordInput = useRef<any>(null);
    const loginHandler = async (email: string, password: string) => {
        const data: any = await userApi.login(email, password);
        console.log(data);

        if (email === '') {
            emailInput.current?.focus();
            toast.error('Email can not be null!', {
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        } else if (password === '') {
            passwordInput.current?.focus();
            toast.error('Password can not be null!', {
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        } else if (data.response?.status === 401) {
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
            sessionStorage.setItem('token', data.accessToken);
            sessionStorage.setItem('refreshToken', data.refreshToken);
        }
    };
    return (
        <div className='flex bg-transparent w-full h-full'>
            <div className='flex flex-col items-center m-auto p-5 bg-white rounded-2xl shadow-lg'>
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
                <span className='text-sm font-thin w-[70%] text-center pt-6'>
                    Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với Điều khoản sử
                    dụng của chúng tôi.
                </span>
            </div>
        </div>
    );
}

export default Login;
