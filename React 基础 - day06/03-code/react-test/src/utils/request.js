// 创建axios实例，配置请求拦截器，响应拦截器

import axios from 'axios'
import { delToken, getToken } from './token'
import router from '@/router'
// 1.根域名配置
// 2.超时时间
// 3.请求拦截器
// 4.响应拦截器
const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0', // 域名配置
    timeout: 5000 // 超时时间
})

// 添加请求拦截器 在请求发送之前做拦截 插入一些自自定义的配置
request.interceptors.request.use((config) => {
    // 操作这个config注入token
    // 1 获取token
    const token = getToken()
    // 2 按照后端的格式要求做token拼接
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器 处理返回的数据
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.dir(error);
    // token失效处理
    if (error.response.status === 401) {
        delToken()
        router.navigate('/login')
        window.location.reload()
    }

    return Promise.reject(error)
})

export { request }