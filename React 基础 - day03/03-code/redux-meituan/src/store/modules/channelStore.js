import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 异步action处理
// redux store 配置store->同步修改和异步修改 (channelStore.js)
// react 组件 -> 消费使用store中的数据 dispatch action更新store (App.js)

// 实现步骤
// *1 创建store的写法保持不变，配置好同步修改状态的方法
// *2 单独封装一个函数，在函数内部return一个新函数，在新函数中
//   2.1 封装异步请求获取数据
//   2.2 调用同步actionCreater传入异步数据生成一个action对象，并使用dispatch提交
// *3 组件中dispatch的写法保持不变


// 1.
const channelStore = createSlice({
    name: 'channel',
    initialState: {
        channelList: []
    },
    reducers: {
        setChannelList(state, action) {
            state.channelList = action.payload
        }
    }
})

// 创建异步
const { setChannelList } = channelStore.actions
const url = 'http://geek.itheima.net/v1_0/channels'

// 2. 封装一个函数 内return 一个新函数，在新函数中封装异步
// 得到数据后通过dispatch函数 触发修改
const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios.get(url)
        dispatch(setChannelList(res.data.data.channels))
    }
}

export { fetchChannelList }

const channelReducer = channelStore.reducer
export default channelReducer