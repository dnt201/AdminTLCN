// import {
//     ListUser,
//     DetailUser,
//     NewUser,
//     Home,
//     Login,
//     DetailCategory,
//     ListPost,
//     DetailPost,
//     NewPost,
// } from '~/screens';
import { Footer, Navbar } from 'flowbite-react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './modules';
import DeClareRouter from './router';
// import LayoutDefault from './layouts/LayoutDefault';
// import ListCatgory from './screens/list/ListCatgory';
// import ListCourse from './screens/list/ListCourse';
// import NewCategory from './screens/new/NewCategory';
// import PrivateRoute from './screens/privateRoute';
// import SomeThingWentWrong from './screens/SomeThingWentWrong';

const App = () => {
    return (
        <div className='min-h-screen flex '>
            <div className='w-1/5     '>
                <SideBar />
            </div>
            <Outlet />
        </div>
    );
};
export default App;
