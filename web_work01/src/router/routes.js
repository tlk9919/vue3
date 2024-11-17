import MainPage from "@/pages/MainPage/MainPage.vue";
import About from "@/components/About.vue";
import Menu from "@/components/Menu.vue";
import Home from "@/components/Home.vue";

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
        path: '/home',
        name: 'home',
        title: '后台',
        component: Home,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: { requiresAuth: true },  // 需要登录才能访问
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
export default routes;
