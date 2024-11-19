import Login from '../page/Login'
import Article from '../page/Article'
import Layout from '../page/Layout'
import Board from '../page/Board'
import About from '../page/About'
import NotFound from '../page/NotFound'

import { createBrowserRouter, createHashRouter } from 'react-router-dom'
// 两种路由模式
// history  url /login    history对象 + pushState事件   需要后端支持
// hash     url /#/login  监听hashChange事件            不需要后端支持
const router = createBrowserRouter([
  {
    path: '/',
    // 一级路由
    element: <Layout />,
    // 二级路由
    children: [
      //默认二级路由
      {
        index: true,
        element: <Board />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/article/:id/:name',
    // path: '/article', 
    element: <Article />
  },
  {
    // *作为path的配置路由
    path: '*',
    element: <NotFound />
  }
])

console.log(router)

export default router