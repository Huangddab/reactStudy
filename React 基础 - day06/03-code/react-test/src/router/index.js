// 路由配置  并没有实现@联想
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import AuthRoute from "@/components/AuthRoute"
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'


import { createBrowserRouter } from 'react-router-dom'
// 配置路由实例
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                // 默认显示
                index: true,
                element: <Home />
            },
            {
                path: 'article',
                element: <Article />
            },
            {
                path: 'publish',
                element: <Publish />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router