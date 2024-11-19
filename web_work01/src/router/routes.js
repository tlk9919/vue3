import MainPage from "@/pages/MainPage/MainPage.vue";
import Menu from "@/components/Menu.vue";
import Home from "@/components/Home.vue";
import Admin from "@/pages/DashBoard/Admin.vue";
import Log from "@/components/Log.vue";
import LogsDetails from "@/components/LogsDetails.vue";

const routes = [
    {
        //path 代表的是路径
        //name 路由的名称
        //title 页面的标题
        //component 对应组件的名称
        path: '/',
        name: 'login',
        title: '登录',
        component: () => import('@/pages/NewLoginPage/NewLoginPage.vue')
    },

    {
        path: '/admin',
        name: 'admin',
        title: '后台',
        component: Admin,
        meta: { requiresAuth: true },  // 需要登录才能访问
        children: [
            {
                path: '/log',
                name: 'log',
                component: Log,
                meta: { requiresAuth: true },  // 需要登录才能访问
                children: [{
                    name:'logs',
                    path:'logsDetails/:id/:title/:content',
                    component:LogsDetails,
                    meta: { requiresAuth: true },  // 需要登录才能访问
                    props:true
                    // props(route){
                    //     return route.params
                    // }
                }]
            },
            {
                path:'/menu',
                name: 'menu',
                component: Menu,
                meta: { requiresAuth: true },  // 需要登录才能访问
            },
            {
                path:'/home',
                name:'home',
                component: Home,
                meta: { requiresAuth: true },  // 需要登录才能访问
            }

        ]

    },



]
export default routes;
