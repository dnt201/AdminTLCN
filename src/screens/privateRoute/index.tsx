import { Navigate, Outlet } from 'react-router-dom';
import Login from '../login/Login';

const useAuth = () => {
    const user = { loggedIn: true };
    return user && user.loggedIn;
};

const PrivateRoute = (children: any) => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
    // return isAuth ? <Outlet /> : <Login />;
};

export default PrivateRoute;
