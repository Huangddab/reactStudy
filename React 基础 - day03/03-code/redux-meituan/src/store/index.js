// 1 couterStore.js编写store模块代码
// 2 store/index.js注册子模块
// 3 index.js为react注入store  react-redux负责把Redux和React 链接 起来
// 4 组件中使用 useSelector，它的作用是把store中的数据映射到组件

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./modules/couterStore";
import channelReducer from "./modules/channelStore";
import foodsReducer from "./modules/takeaway";

export default configureStore({
    reducer: {
        // 注册子模块
        counter: counterReducer,

        channel: channelReducer,

        foods: foodsReducer
    }
})