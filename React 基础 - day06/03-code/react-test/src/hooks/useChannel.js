// 封装获取频道列表的逻辑
// 获取频道列表有两个地方用到，把他封装成一个hook

import { getChannelApi } from "@/apis/article"
import { useEffect, useState } from "react"

function useChannel() {
    // 获取频道列表的所有逻辑
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        // 调用接口
        const getChannelList = async () => {
            const res = await getChannelApi()
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])

    // 把组件中要用到的数据return出去
    return { channelList }

}
export { useChannel }