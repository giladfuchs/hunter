import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from 'ui-component/layout/Loadable';
import GuestGuard from '../utils/route-guard/GuestGuard';

const MaintenanceError = Loadable(lazy(() => import('ui-component/layout/Error')));
const Form = Loadable(lazy(() => import('../ui-component/form/Form')));
const Login = Loadable(lazy(() => import('views/pages/Login')));

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
