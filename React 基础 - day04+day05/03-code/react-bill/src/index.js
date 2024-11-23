import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./router";
// 导入定制主题文件
import './theme.css'
import { Provider } from "react-redux";
import store from "./store";

// reduex配置


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // 严格模式
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>
);
