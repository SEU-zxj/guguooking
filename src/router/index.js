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
    },
    {
        path: '/HotelDetail',
        name: 'HotelDetail',
        component: () => import('@/components/HotelDetail')
    },
    {
        path: '/BookRoom',
        name: 'BookRoom',
        component: () => import('@/components/BookRoom')
    }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
