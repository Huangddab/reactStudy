import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        // 初始化商品列表
        foodsList: [],
        activeItem: 0,
        cartList: []
    },
    reducers: {
        // 定义方法，更改商品列表
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        // 更改memu active
        changeActiveIndex(state, action) {
            state.activeItem = action.payload
        },
        // 添加购物车
        addCart(state, action) {
            // 是否添加过？以action.payload.id去cartList中匹配 匹配到了 添加过
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                // 添加过 拿到该商品+1
                item.count++;
            } else {
                // 如果商品不存在，初始化 count 为 1 并添加到购物车
                state.cartList.push({
                    ...action.payload,
                    count: 1 // 初始化 count
                });
            }
        },
        // 清空购物车
        clearCart(state) {
            state.cartList = []
        },
        // 购物车增加数量
        increCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        // 购物车减少数量
        decreCount(state, action) {
            // 找到选择商品的索引 findIndex不存在会返回-1
            const itemIndex = state.cartList.findIndex(item => item.id === action.payload.id)
            // 商品存在才进入逻辑
            if (itemIndex !== -1) {
                const item = state.cartList[itemIndex]
                if (item.count > 1) {
                    // 如果数量大于 1，则直接减 1
                    item.count--
                } else {
                    // 如果数量为1，再减则移除商品
                    state.cartList.splice(itemIndex, 1)
                }
            }
        }
    }
})

// 异步获取接口数据 http://localhost:3005/takeaway

// 把方法解构出来
const { setFoodsList, changeActiveIndex, addCart, clearCart, increCount, decreCount } = foodsStore.actions
// 异步获取数据的方法
const fetchFoodsList = () => {
    return async (dispatchEvent) => {
        const res = await axios.get('http://localhost:3005/takeaway')
        //    将获取得到的数据存到store中使用reducer中的方法 提交到action中
        dispatchEvent(setFoodsList(res.data))
    }
}
// reducer里面的方法导出
export { fetchFoodsList, changeActiveIndex, addCart, clearCart, increCount, decreCount }
const foodsReducer = foodsStore.reducer
export default foodsReducer