// App -> A -> B

import { createContext, useContext } from "react";

// 1. createContext方法创建一个上下文对象

const MsgContext = createContext();

// 2. 在顶层组件 通过Provider组件提供数据

// 3. 在底层组件 通过useContext钩子函数使用数据

function A() {
  return (
    <div style={{ border: "1px solid red" }}>
      this is A component
      <B />
    </div>
  );
}

function B() {
  const msg = useContext(MsgContext);
  return <div style={{ border: "2px solid blue" }}>this is B compnent,{msg}</div>;
}

function App() {
  const msg = "this is app msg";
  return (
    <div style={{ border: "3px solid green" }}>
      <MsgContext.Provider value={msg}>
        this is App
        <A />
      </MsgContext.Provider>
    </div>
  );
}

export default App;
