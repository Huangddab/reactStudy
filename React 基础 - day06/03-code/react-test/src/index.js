import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux';
import store from "./store"
import 'normalize.css'
/**
 * normalize 样式初始化插件
保护有用的浏览器默认样式而不是完全去掉它们
一般化的样式：为大部分HTML元素提供
修复浏览器自身的bug并保证各浏览器的一致性
优化CSS可用性：用一些小技巧
解释代码：用注释和详细的文档来
 */


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
