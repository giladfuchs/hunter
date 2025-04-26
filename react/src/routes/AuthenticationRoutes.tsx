import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import { Outlet } from 'react-router-dom';

import GuestGuard from '../utils/route-guard/GuestGuard';

const MaintenanceError = Loadable(lazy(() => import('views/pages/Error')));
const Form = Loadable(lazy(() => import('../views/form/Form')));
const Login = Loadable(lazy(() => import('views/pages/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            path: '/login',
            element: (
                <GuestGuard>
                    <Login />
                </GuestGuard>
            )
        },
        {
            path: '/error',
            element: <MaintenanceError />
        },
        {
            path: '/form/:model/:id',
            element: <Form />
        }
    ]
};

export default AuthenticationRoutes;
