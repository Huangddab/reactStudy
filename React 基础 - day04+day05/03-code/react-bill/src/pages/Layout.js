import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { getBillList } from "@/store/modules/billStore"

const Layout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    const { billList } = useSelector(state => state.bill)
    console.log('billList', billList);

    return (
        <div>

            Layout
            <div className="purple">
                <Button color="primary">按钮</Button>
            </div>
            <Button color="primary">按钮</Button>
            <Outlet />
            {/* 二级路由出口 */}
        </div>
    )
}
export default Layout