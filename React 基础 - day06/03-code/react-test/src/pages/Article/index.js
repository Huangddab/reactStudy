import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Space, Tag, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
// 汉化包 时间选择器显示中文
import locale from 'antd/es/date-picker/locale/zh_CN'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    // 枚举方式显示状态
    const status = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="green">审核通过</Tag>
    }
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            // data -- 后端返回的状态status 根据他做条件渲染
            // 1 待审核 2 审核通过 
            // 三元方式
            // render: data => data === 1 ? <Tag color="warning">待审核</Tag> : <Tag color="green">审核通过</Tag>
            // 枚举方式
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]
    // 筛选
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdatae: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })
    // 频道列表
    const { channelList } = useChannel()

    // 文章列表
    const [articleList, setArticleList] = useState()
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            // 不传参 默认十条数据
            const res = await getArticleListAPI(reqData)
            setArticleList(res.data.results)
            setCount(res.data.total_count)
        }
        getList()
    }, [reqData])

    // 筛选功能
    // 获取 当前的筛选数据
    const onSubmitHandle = (value) => {
        console.log('sasasa', value);

        setReqData({
            ...reqData,
            channel_id: value.channel_id,
            status: value.status,
            begin_pubdatae: value.date[0].format('YYYY-MM-DD'),
            end_pubdate: value.date[1].format('YYYY-MM-DD'),
            page: value.page,
            per_page: value.per_page
        })
        // 重新拉取文章列表 逻辑重复 可复用
        // reqData 依赖项发生变化 重复执行复用
    }

    // 分页
    const onPageChange = (page) => {
        console.log(page);

    }
    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onSubmitHandle}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"

                            style={{ width: 120 }}
                        >
                            {
                                channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 count 条结果：${count}`}>
                <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
                    total: count,
                    page: reqData.per_page,
                    onChange: onPageChange
                }} />
            </Card>
        </div>
    )
}

export default Article