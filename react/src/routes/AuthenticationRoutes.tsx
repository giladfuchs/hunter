import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from '../layout/NavMotion';
import GuestGuard from '../utils/route-guard/GuestGuard';

const MaintenanceError = Loadable(lazy(() => import('views/pages/Error')));
const Login = Loadable(lazy(() => import('views/pages/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/pages/error',
            element: <MaintenanceError />
        },
        {
            path: '/login',
            element: <Login />
        }
    ]
};

export default AuthenticationRoutes;
