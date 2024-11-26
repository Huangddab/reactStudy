// 用户相关的api
import { request } from "@/utils";

// 登录
export function loginApi(formData) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: formData
    })
}

// 获取用户信息
export function getUserInfo() {
    return request({
        url: '/user/profile',
        method: 'GET' // 写错成POST 报403 
    })
}
