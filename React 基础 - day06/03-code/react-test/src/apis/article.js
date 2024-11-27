import { request } from '@/utils'

// 获取频道信息
export function getChannelApi() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// 创建文章
export function craeteArticlApi(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

// 上传图片
export function uploadImage(data){
    return request({
        url:'upload',
        method:'POST',
        data
    })
}