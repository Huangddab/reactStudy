import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchLogin } from '@/store/modules/user'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (formValue) => {
        // 获取到表单数据
        console.log('formValue', formValue);
        // 触发异步action存入token
        await dispatch(fetchLogin(formValue))
        // 跳转到首页
        navigate('/')
        // 提示用户
        message.success('登录成功')
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form validateTrigger={['onBlur']}
                    // 点击登录按钮时触发
                    onFinish={onFinish}>
                    {/* 失焦时触发 */}
                    <Form.Item
                        // name属性与后端接口对应
                        name="mobile"
                        // reles属性，校验规则
                        initialValue={"13800000002"}
                        rules={[
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不对'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        initialValue={"246810"}
                        rules={[
                            { required: true, message: '请输入验证码' },
                        ]}>
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login