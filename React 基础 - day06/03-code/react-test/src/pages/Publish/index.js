import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { craeteArticlApi, getChannelApi } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'
const { Option } = Select

const Publish = () => {

    // 保存图片
    const [imageList, setImageList] = useState([])
    const [imageType, setImageType] = useState(0)

    // 获取频道列表 封装成hook
    // const [channelList, setChannelList] = useState([])

    // useEffect(() => {
    //     // 调用接口
    //     const getChannelList = async () => {
    //         const res = await getChannelApi()
    //         setChannelList(res.data.channels)
    //     }
    //     getChannelList()
    // }, [])

    const { channelList } = useChannel()
    // 表单提交操作
    const onmFinishHandle = async (formValue) => {
        // 按照接口文档处理数据
        // 提交之前做校验 封面的imageType和imageList 的数量是否一致

        if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')

        const { title, content, channel_id } = formValue
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map(item => item.response.data.url)
            },
            channel_id,
        }
        await craeteArticlApi(reqData)
    }
    // 上传图片

    const onUploadChanege = async (value) => {
        // console.log('value', value);
        setImageList(value.fileList)
    }
    // 切换图片类型
    const onImageType = (value) => {
        // console.log('va', value.target.value);
        setImageType(value.target.value)

    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onmFinishHandle}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onImageType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            name='image'
                            listType="picture-card" // 外观样式
                            showUploadList // 显示上传列表
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onUploadChanege}
                            maxCount={imageType}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        {/* 富文本编辑器 */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish