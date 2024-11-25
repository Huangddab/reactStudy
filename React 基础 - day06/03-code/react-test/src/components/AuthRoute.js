// 封装高阶组件：有token正常跳转 无token去登录
// 使用token做路由权限控制

import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"


const AuthRoute = ({ children }) => {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} />
    }
}
export default AuthRoute