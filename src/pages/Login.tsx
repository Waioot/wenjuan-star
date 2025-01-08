import { Space, Typography, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Login.module.scss';
import { REGISTER_PATHNAME } from '../router';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { loginService } from '../services/user';
import { setToken } from '../utils/user-token';
import { useNavigate } from 'react-router-dom';
import { MANAGE_LIST_PATHNAME } from '../router';
import { message } from 'antd';
const { Title } = Typography;

type loginType = {
  password?: string;
  remember?: boolean;
  username?: string;
};

// 配置项
const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}
function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}
function getUserInfoFromLocalStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

function Login() {
  const [form] = Form.useForm(); // 第三方 hook, 用于表单的双向绑定

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();
    if (userInfo.username && userInfo.password) {
      form.setFieldsValue(userInfo);
    }
  }, [form]);

  // 请求后端
  const navigate = useNavigate();
  const { run } = useRequest(
    async (username: string, password: string) => {
      return await loginService(username, password);
    },
    {
      manual: true,
      onSuccess(result?: any) {
        // data会返回token，这里可以存储token
        const { token = '' } = result;
        setToken(token); // 存储 token
        message.success('登录成功');
        navigate(MANAGE_LIST_PATHNAME); // 导航到“我的问卷”
      },
    }
  );

  // 表单提交
  const onFinish = (values: loginType) => {
    const { username, password, remember } = values || {};

    run(username as string, password as string); // 执行 ajax
    console.log(values);

    if (remember) {
      // 本地记住用户信息
      rememberUser(username as string, password as string);
    } else {
      // 删除用户信息
      deleteUserFromStorage();
    }
  };

  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <UserOutlined />
        </Title>
        <Title level={2}>登录</Title>
      </Space>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
          form={form}
        >
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 4,
                max: 16,
                message: '用户名长度为4-16位 且只能包含字母、数字和下划线',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名只能包含字母、数字和下划线',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 16, offset: 6 }}
            name='remember'
            valuePropName='checked'
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
