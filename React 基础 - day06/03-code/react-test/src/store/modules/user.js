// 和用户相关的状态管理哦

import { delToken, getToken, request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken } from "@/utils";
// redux是基于浏览器内存的存储方式，刷新时状态恢复为初始值，需要持久化他使用localStorage
const userStore = createSlice({
    name: 'user',
    // 初始化数据状态state
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步代码 action
    reducers: {
        // 存入token
        setToken(state, action) {
            state.token = action.payload
            // localStorage也存一份
            // localStorage.setItem('token_key', action.payload)
            _setToken(action.payload)
        },
        // 存入当前用户信息
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        // 退出登录
        clearUserInfo(state) {
            state.token = ""
            state.userInfo = {}
            delToken()
        }
    }
})

// 解构actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer


// 异步方法，完成登录获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1 发送异步请求
        const res = await request.post('/authorizations', loginForm)
        // 2 提交给同步函数存入token
        dispatch(setToken(res.data.token))
    }
}
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}
export { setToken, fetchLogin, setUserInfo, fetchUserInfo, clearUserInfo }
export default userReducer
