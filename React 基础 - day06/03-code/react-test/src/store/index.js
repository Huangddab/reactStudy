// npm i react-redux @reduxjs/toolkit
// 组合子模块,导出数据

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user"

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store