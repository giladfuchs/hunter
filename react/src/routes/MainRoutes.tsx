import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const AGTable = Loadable(lazy(() => import('views/AGTable')));
const StudentView = Loadable(lazy(() => import('views/StudentView')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/view/:id',
            element: <StudentView />
        },

        {
            path: '/:model',
            element: <AGTable />
        }
    ]
};

export default MainRoutes;
