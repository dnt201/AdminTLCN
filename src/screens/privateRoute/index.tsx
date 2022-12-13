import { Navigate, Outlet } from 'react-router-dom';
import Login from '../login';

const useAuth = () => {
    const user = { loggedIn: true };
    if (window.location.pathname === '/home') {
        user.loggedIn = true;
    } else if (sessionStorage.getItem('user')) {
        user.loggedIn = true;
    } else user.loggedIn = false;
    return user && user.loggedIn;
};

const PrivateRoute = (children: any) => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
    // return isAuth ? <Outlet /> : <Login />;
};

export default PrivateRoute;
