import { useParams, useSearchParams } from "react-router-dom"

const Article = () => {
  // const [params] = useSearchParams()
  // const id = params.get('id')
  // const name = params.get('name')
  // console.log('id', id, 'name', name)

  // 抽象路由router/index.js中 
  // path: '/article', 


  const params = useParams()
  const id = params.id
  const name = params.name
  // 抽象路由router/index.js中 
  // path: '/article/:id/:name',

  return <div>我是文章页{id}-{name}</div>
}

export default Article