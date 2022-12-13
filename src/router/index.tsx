import { AppDispatch, RootState } from '@app/store';
import { clearAllUser, userGetMe } from '@redux/userSlice';
import BlogDetail from '@screens/BlogDetail';

import Home from '@screens/home/Home';

import ListPost from '@screens/ListPost';
import ListTag from '@screens/ListTag';
import AddTag from '@screens/ListTag/AddTag';
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
                <Route path='posts'>
                    <Route index element={<ListPost />} />
                    <Route path=':postId' element={<BlogDetail />} />
                    {/* <Route path=':postId' element={<DetailPost />} />
                    <Route path='new' element={<NewPost />} /> */}
                </Route>
                <Route path='tags'>
                    <Route index element={<ListTag />} />
                    <Route path='addTag' element={<AddTag />} />
                    {/* <Route path=':courseId' element={<DetailPost />} />
                    <Route path='new' element={<NewPost />} /> */}
                </Route>
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
