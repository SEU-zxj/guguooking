import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        redirect: "/Main",
        component: () => import('@/App')             
    },
    {
        path: '/Main',
        name: "Main",
        component: () => import('@/components/Main'),
        children: [
        ]
    },
    {
        path: '/HotelList',
        name: 'HotelList',
        component: () => import('@/components/HotelList')
    }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
