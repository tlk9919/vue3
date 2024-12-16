import { defineStore } from "pinia";
import { fetchMenu } from "@/apis/menu.js";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useMenuStore = defineStore("menuStore", () => {
    const menu = ref([]); // 用于存储菜单数据
    const router = useRouter();

    // 注册路由的方法
    const registerRoutes = (menuItems) => {
        const processMenu = (items) => {
            items.forEach(item => {
                if (!router.hasRoute(item.name)) {
                    router.addRoute('InfoPage', {
                        path: item.name,
                        name: item.name,
                        component: () => import(`@/pages/InfoPage/views/${item.name}.vue`),
                    });
                }
                // 递归处理子菜单
                if (item.children && item.children.length > 0) {
                    processMenu(item.children);
                }
            });
        };
        processMenu(menuItems); // 递归注册路由
    };

    // 加载菜单数据
    const loadMenu = async () => {
        await fetchMenu().then(res => {
            menu.value = res; // 更新菜单数据
            registerRoutes(res); // 注册动态路由
        });
    };

    return { menu, loadMenu };
});
