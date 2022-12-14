import React from 'react';

import userApi, { userApiAuth } from '@api/userApi';
import * as Yup from 'yup';
import { CheckCircle, ChevronLeft, XCircle } from '@icons/index';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@redux/userSlice';
import { AppDispatch, RootState } from 'src/app/store';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { Formik, FastField, Form } from 'formik';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
interface LoginFormValues {
    email: string;
    password: string;
}
interface iPropsLogin {
    pause: boolean;
}

const FormLogin: React.FC<iPropsLogin> = (props) => {
    const navigate = useNavigate();
    const { pause } = props;
    const { loading } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    const initialValues: LoginFormValues = { email: '', password: '' };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email sai định dạng').required('Vui lòng nhập email'),
        password: Yup.string()
            .min(8, 'Mật khẩu phải dài hơn 8 ký tự')
            .required('Vui lòng nhập mật khẩu'),
    });
    const handleSubmit = async (values: LoginFormValues) => {
        console.log('sub');
        let user: userApiAuth = {
            email: values.email,
            password: values.password,
        };
        const a = await dispatch(userLogin(user));
        if (a.payload.accessToken) {
            toast.success('Đăng nhập thành công!', {
                pauseOnHover: false,
            });
            navigate('/');
        } else
            toast.error(a.payload.message, {
                pauseOnHover: false,
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => await handleSubmit(values)}
        >
            {({ values, errors, touched, setFieldError, resetForm, ...props }) => (
                <Form className='mt-4 flex flex-col items-center  pb-4'>
                    <div className='flex flex-col mb-2 mt-6 w-full '>
                        <FastField
                            placeholder='Tên đăng nhập'
                            className={
                                'border border-gray-c3 px-2 py-3 m-2 rounded-lg w-full  ' +
                                (!errors.email && values.email.length > 0
                                    ? ' border-success text-success '
                                    : touched.email && errors.email
                                    ? ' border-danger text-danger placeholder:text-danger   '
                                    : '')
                            }
                            name='email'
                        />
                        {touched.email && errors.email ? (
                            <i className='ml-1 mt-[1px] text-danger text-xs flex items-center '>
                                <XCircle className='text-danger w-4 h-4 mr-[1px]' />
                                {errors.email}
                            </i>
                        ) : (
                            values.email.length > 0 &&
                            !errors.email && (
                                <i className='ml-1 mt-[1px] text-yes text-success text-xs flex items-center '>
                                    <CheckCircle className='text-success w-4 h-4 mr-[1px]' /> Verify
                                </i>
                            )
                        )}
                    </div>
                    <div className='flex flex-col mb-3 w-full '>
                        <FastField
                            className={
                                'border border-gray-c3 px-2 py-3 m-2 rounded-lg w-full ' +
                                (!errors.password && values.password.length > 0
                                    ? ' border-success text-success '
                                    : touched.password && errors.password
                                    ? ' border-danger text-danger  placeholder:text-danger '
                                    : '')
                            }
                            name='password'
                            type='password'
                            placeholder='Mật khẩu'
                        />

                        {touched.password && errors.password ? (
                            <i className='ml-1 mt-[1px] text-danger text-xs flex items-center '>
                                <XCircle className='text-danger w-4 h-4 mr-[1px]' />
                                {errors.password}
                            </i>
                        ) : (
                            values.password.length > 0 &&
                            !errors.password && (
                                <i className='ml-1 mt-[1px] text-yes text-success text-xs flex items-center '>
                                    <CheckCircle className='text-success w-4 h-4 mr-[1px]' /> Verify
                                </i>
                            )
                        )}
                    </div>
                    <div className='flex flex-row-reverse '>
                        <button
                            className={
                                'transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110 border border-gray-c3 p-2 rounded-xl bg-warning text-white text-lg font-semibold' +
                                ' flex justify-center items-center gap-1 ' +
                                (pause ||
                                !props.isValid ||
                                values.email.length <= 0 ||
                                values.email.length <= 0
                                    ? ' cursor-not-allowed'
                                    : null)
                            }
                            disabled={
                                pause ||
                                loading ||
                                !props.isValid ||
                                values.email.length <= 0 ||
                                values.email.length <= 0
                            }
                            type='submit'
                        >
                            <span className='flex-1 text-center'>Đăng nhập</span>
                            <ClipLoader
                                color={'#fff'}
                                loading={loading}
                                // cssOverride={override}
                                size={16}
                                className=' right-3 mt-1 '
                                aria-label='Loading Spinner'
                                data-testid='loader'
                            />
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

/* <div className="w-full flex flex-col items-center">
              <input
                className="caret-primary w-3/4 border-[1px]   sm:w-[340px] text-bg2 bg-smoke border-smokeHover 
            mt-10 px-4 py-2 text-xs rounded-[9999px] transition-colors "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Địa chỉ email"
              />
              <input
                className="caret-primary w-3/4 border-[1px]   sm:w-[340px] text-bg2 bg-smoke border-smokeHover 
            mt-2 px-4 py-2 text-xs rounded-[9999px] transition-colors "
                placeholder="Mật khẩu"
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
                type="password"
              />
              <div className="flex mt-4 w-3/4 flex-col sm:w-[340px] sm:flex-row ">
                <button
                  className="text-s relative items-center text-center bg-transparent text-bg w-3/4  border-[1px] sm:w-[150px] py-2 rounded-[9999px] mr-1"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2" />
                  Back
                </button>
                <button
                  className=" text-s bg-primary w-3/4 border-[1px] sm:w-[190px]  py-2 rounded-[9999px] "
                  onClick={() => loginHandler(email, password)}
                >
                  Login
                </button>
              </div>
            </div> */

export default FormLogin;
