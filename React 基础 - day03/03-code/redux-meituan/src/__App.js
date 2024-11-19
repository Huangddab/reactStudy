// useSelector，它的作用是把store中的数据映射到组件
import { useSelector, useDispatch } from "react-redux"
// 导入action对象方法
import { increment, decrement, incrementByTen, decrementByTen } from "./store/modules/couterStore"
import { fetchChannelList } from "./store/modules/channelStore"
import { useEffect } from "react"

function App() {
    const { count } = useSelector(state => state.counter)
    // 拿到dispatch
    const dispatch = useDispatch()
    // 使用异步数据
    const { channelList } = useSelector(state => state.channel)
    useEffect(() => {
        dispatch(fetchChannelList())
    }, [dispatch])

    return (
        <div className="App">
            {/* 调用dispatch提交action对象 */}
            <button onClick={() => dispatch(decrementByTen(10))}>-10</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => { dispatch(incrementByTen(10)) }}>+10</button>

            <div>
                <ul>
                    {channelList.map(task => <li key={task.id}>{task.name}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default App