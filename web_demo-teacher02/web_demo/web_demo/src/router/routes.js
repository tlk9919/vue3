import MainPage from "@/pages/MainPage/MainPage.vue";

const routes = [
    {
        path: '/',
        name: 'index',
        title: '首页',
        component: MainPage
    },
    {
        path: '/newlogin',
        name: 'newlogin',
        title: '新登陆',
        component: () => import('@/pages/NewLoginPage/NewLoginPage.vue')
    },
    {
        path: '/login',
        name: 'login',
        title: '登陆',
        component: () => import('@/pages/LoginPage/LoginPage.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        title: '数据页面',
        component: () => import('@/pages/DashBoard/DashBoard.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/InfoPage',
        name: 'InfoPage',
        title: '信息页面',
        component: () => import('@/pages/InfoPage/InfoPage.vue'),
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '',
                name: 'InfoDashboard',
                component: () => import('@/pages/DashBoard/DashBoard.vue')
            }
            // 动态路由的子路由会通过 menuStore 中的 registerRoutes 方法添加
        ]
    }
]
export default routes;
