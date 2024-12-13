// // 测试token是否注入成功
// import { request } from "@/utils"
// import { useEffect } from "react"
// const Layout = () => {
//     useEffect(() => {
//         request.get('/user/profile')
//     },[])
//     return (<>
//         layout
//     </>)
// }
// export default Layout


import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const onMenuCLink = (route) => {
        // console.log('2', route);
        const path = route.key
        navigate(path)
    }
    // 菜单反向高亮
    const location = useLocation()
    const selectedKey = location.pathname
    // 拿到当前路由

    // 展示个人信息
    const dispatch = useDispatch()
    const name = useSelector(state => state.user.userInfo.name)
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])
    
    // 退出登录
    const loginOut=()=>{
        dispatch(clearUserInfo())
        navigate('/login')
    }
    return (
        <Layout>
            <Header className="header">
                {/* <div className="logo" /> */}
                <div className="user-info">
                    <span className="user-name">{name}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={loginOut}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        // defaultSelectedKeys={['1']}
                        selectedKeys={selectedKey}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={onMenuCLink}
                    >
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout