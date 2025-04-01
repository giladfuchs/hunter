import {FilterFetchType} from "@/common/types";

const DashboardRoutes = {
    path: '',
    meta: {
        requiresAuth: true,
    },
    redirect: `/${FilterFetchType.student}`,
    component: () => import('@/assets/layouts/full/FullLayout.vue'),
    children: [




        {
            name: 'main_table',
            path: ':model',
            component: () => import('@/views/apps/StudentsTable.vue')
        },

        {
            name: 'student',
            path: 'student/view/:id',
            component: () => import('@/views/apps/StudentView.vue')
        },



    ]
};

export default DashboardRoutes;
