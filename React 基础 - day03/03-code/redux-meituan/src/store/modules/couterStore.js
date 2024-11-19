import { createSlice } from "@reduxjs/toolkit";

// Redux Toolkit 编写redux逻辑的 和 react-redux 链接redux和react组件
// 1 配置counterStore模块

const counterStore = createSlice({
    // 定义模块名称
    name: 'counter',
    // 初始化数据
    initialState: {
        count: 0
    },
    // 修改数据的同步方法
    reducers: {
        // 加一
        increment(state) {
            state.count++;
        },
        // 减一
        decrement(state) {
            state.count--;
        },
        // 加十
        incrementByTen(state, actions) {
            state.count += actions.payload
        },
        // 减十
        decrementByTen(state, actions) {
            state.count -= actions.payload
        }
    }
})

// 解构出两个方法
const { increment, decrement, incrementByTen, decrementByTen } = counterStore.actions

// 获取reducer函数
const counterReducer = counterStore.reducer

// 导出两个方法

export { increment, decrement, incrementByTen, decrementByTen }

// 默认导出reducer函数
export default counterReducer