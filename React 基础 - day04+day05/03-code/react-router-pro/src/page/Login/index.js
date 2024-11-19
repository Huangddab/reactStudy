import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  return (
    <div>
      我是登录页
      {/* 声明式的写法 声明式导航 Link*/}
      <Link to="/article">跳转到文章页</Link>
      {/* 命令式的写法 编程式导航 useNavigate*/}
      <button onClick={() => navigate('/article')}>跳转到文章页</button>
      <button onClick={() => navigate('/article?id=1001&name=jack')}>searchParams传参</button>
      {/* 前面两种路由中应该     path: '/article'定义路由  */}
      <button onClick={() => navigate('/article/1001/jack')}>params传参</button>
      {/* 最后应该   // path: '/article/:id/:name',*/}
    </div>
  )
}

export default Login