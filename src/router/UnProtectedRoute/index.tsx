import { Navigate } from 'react-router-dom';

export type UnProtectedRouteProps = {
    isAuthenticated: boolean;
    outlet: JSX.Element;
};

export default function UnProtectedRoute({ isAuthenticated, outlet }: UnProtectedRouteProps) {
    if (!isAuthenticated) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: '/' }} />;
    }
}
