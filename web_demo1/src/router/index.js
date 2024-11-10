//创建路由并暴露

//创建createRouter
import {createRouter ,createWebHistory} from "vue-router";

import routes from "@/router/routes";

//创建路由器，路由是一一对应，所以有path和component
// const routes = createRouter({
//     history: createMemoryHistory(), //路由器的工作模式
//     routes:[{
//         //path 代表的是路径
//         //name 路由的名称
//         //title 页面的标题
//         //component 对应组件的名称
//         path: '/',
//         name: 'index',
//         title: '首页',
//         component: MainPage
//     },
//         {
//             path: '/login',
//             name: 'login',
//             title: '登陆',
//             component: () => import('../pages/LoginPage/LoginPage.vue')
//         },
//         {
//             path: '/dashboard',
//             name: 'dashboard',
//             title: '数据页面',
//             component: () => import('../pages/DashBoard/DashBoard.vue')
//         }
//     ]
//
// })
//
//创建路由器，路由是一一对应，所以有path和component

const router = createRouter({
    //history: 代表我们使用history模式
    //routes: 我们具体的路由配置项
    history: createWebHistory(),
    routes: routes
})

export default router