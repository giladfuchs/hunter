import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/layout/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const AGTable = Loadable(lazy(() => import('ui-component/table/ag-grid/AGTable')));
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
