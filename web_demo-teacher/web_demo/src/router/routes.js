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
    }

]
export default routes;
