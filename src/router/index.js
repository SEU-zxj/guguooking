import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        redirect: "/main",
        component: () => import('@/App')             
    },
    {
        path: '/main',
        name: "main",
        component: () => import('@/components/main')   
    },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
