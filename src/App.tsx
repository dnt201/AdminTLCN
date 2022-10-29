import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { List, Detail, New, Home, Login } from '~/screens';
import NotFound from '~/screens/notFound/NotFound';
import LayoutDefault from './layouts/LayoutDefault';
import ListCatgory from './screens/list/ListCatgory';
import NewCategory from './screens/new/NewCategory';
import PrivateRoute from './screens/privateRoute';

const App = () => {
    return (
        <div className='bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-repeat h-screen'>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<PrivateRoute />}>
                    <Route element={<LayoutDefault />}>
                        <Route path='home' element={<Home />} />
                        <Route path='users'>
                            <Route index element={<List />} />
                            <Route path=':userId' element={<Detail />} />
                            <Route path='new' element={<New />} />
                        </Route>
                        <Route path='category'>
                            <Route index element={<ListCatgory />} />
                            <Route path=':categoryId' element={<Detail />} />
                            <Route path='new' element={<NewCategory />} />
                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
};
export default App;
