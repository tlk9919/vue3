// createRouter 路由的创建函数
// createWebHistory 路由的模式，这里使用 history 模式
import {createWebHistory, createRouter} from "vue-router";
import routes from '@/router/routes.js'
import {useUserStore} from "@/stores/userStore.js";

const router = createRouter({
    //history: 代表我们使用history模式
    //routes: 我们具体的路由配置项
    history: createWebHistory(),
    routes: routes
})
//前置路由守卫
router.beforeEach((to, from, next) => {
    const user = useUserStore()
    const requireAuth = to.matched.some(record => record.meta.requireAuth)
    const userLoggedIn = user.getUserToken
    // const userLoggedIn = localStorage.getItem('userToken')
    if (requireAuth && !userLoggedIn) {
        next('/newlogin')
    }
    next()
})
router.hasRoute = function (name) {
    return !!this.getRoutes().find(route => route.name === name)
}

export default router
