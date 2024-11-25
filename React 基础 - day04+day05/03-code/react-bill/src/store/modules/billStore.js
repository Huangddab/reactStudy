// 账单列表相关

import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const billStore = createSlice({
  name: "bill",
  // 数据state
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    // 异步请求
    const res = await axios.get("http://localhost:8888/ka");
    // 触发同步reducer
    dispatch(setBillList(res.data));
  };
};

// 解构actionCreater函数F
const { setBillList } = billStore.actions;

export { setBillList, getBillList };

// 导出reducer
const billReducer = billStore.reducer;
export default billReducer;
