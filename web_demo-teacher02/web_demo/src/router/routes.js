import MainPage from "@/pages/MainPage/MainPage.vue";

const routes = [
    {
        //path 代表的是路径
        //name 路由的名称
        //title 页面的标题
        //component 对应组件的名称
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
        }
    }
//     }, children: [
//         {
//             name: 'Page1',
//             path: '/InfoPage/Page1',
//             component: () => import('@/pages/InfoPage/views/Page1.vue')
//
//         },
//         {
//             name: "Page2",
//             path: '/InfoPage/Page2',
//             component: () => import('@/pages/InfoPage/views/Page2.vue')
//         },
//         {
//             name: "Page3",
//             path: '/InfoPage/Page3',
//             component: () => import('@/pages/InfoPage/views/Page3.vue')
//         }
//
//     ]
// }
]
export default routes;
