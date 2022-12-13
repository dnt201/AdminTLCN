import { AppDispatch, RootState } from '@app/store';
import { clearAllUser, userGetMe } from '@redux/userSlice';
import DetailPost from '@screens/detail/DetailPost';

import Home from '@screens/home/Home';

import ListPost from '@screens/ListPost';
import Login from '@screens/login';

import SomeThingWentWrong from '@screens/SomeThingWentWrong';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import App from 'src/App';
// import App from '~/App';
// import { Login } from '~/screens';
// import SomeThingWentWrong from '~/screens/SomeThingWentWrong';
import ProtectedRoute from './ProtectedRoute';

const DeClareRouter = () => {
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');

    const { error, accessToken, userInfo } = useSelector((state: RootState) => state.users);

    console.log(accessTokenFromLocalStorage !== null);
    const [beLogged, setLogged] = useState(accessTokenFromLocalStorage !== null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const eventClear = () => {
        console.log('Eventne');
        if (accessToken) {
            navigate('/login');
            dispatch(clearAllUser());
        }
    };
    React.useEffect(() => {
        const accessTokenFromLocalStorage = localStorage.getItem('accessToken');

        if (accessTokenFromLocalStorage !== null && accessTokenFromLocalStorage.length > 0) {
            setLogged(true);
            window.addEventListener('storage', (e) => {
                eventClear();
            });

            if (userInfo === null && accessTokenFromLocalStorage) dispatch(userGetMe());
            // else dispatch(clearAllUser);
        }

        if (error && error === 'Network Error') {
            navigate('/networkError');
        }
        if (accessToken === null) {
            navigate(0);
        }
    }, [accessToken, accessTokenFromLocalStorage]);
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<SomeThingWentWrong />} />
            <Route
                path='/'
                element={<ProtectedRoute isAuthenticated={beLogged} outlet={<App />} />}
            >
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                {/* <Route path='users'>
                    <Route index element={<ListUser />} />
                    <Route path=':userId' element={<DetailUser />} />
                    <Route path='new' element={<NewUser />} />
                </Route> */}
                {/* <Route path='category'>
                    <Route index element={<ListCategory />} />
                    <Route path=':categoryId' element={<DetailCategory />} />
                    <Route path='new' element={<NewCategory />} />
                </Route> */}
                <Route path='posts'>
                    <Route index element={<ListPost />} />
                    <Route path=':postId' element={<DetailPost />} />
                    {/* <Route path=':postId' element={<DetailPost />} />
                    <Route path='new' element={<NewPost />} /> */}
                </Route>
                {/* <Route path='courses'>
                    <Route index element={<ListCourse />} />
                    <Route path=':courseId' element={<DetailPost />} />
                    <Route path='new' element={<NewPost />} />
                </Route> */}
                {/* <Route path='analysis'>
                    <Route index element={<NotFound />} />
                    <Route path='user' element={<NotFound />} />
                    <Route path='post' element={<NotFound />} />
                    <Route path='comment' element={<NotFound />} />
                </Route> */}
            </Route>
        </Routes>
    );
};

export default DeClareRouter;
