import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import sum from "@/test";

console.log("====================================");
console.log(sum(1, 2));
console.log("====================================");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // 严格模式
  <App />
  // </React.StrictMode>
);
