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
        path: '/CheckOrder',
        name: 'CheckOrder',
        component: () => import('@/components/CheckOrder')
    },
    {
        path: '/OrderList',
        name: 'OrderList',
        component: () => import('@/components/OrderList')
    },
    {
        path: '/HotelOrder',
        name: 'HotelOrder',
        component: () => import('@/components/HotelOrder')
    }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
