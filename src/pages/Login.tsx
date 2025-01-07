import { Space, Typography, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Login.module.scss';
import { REGISTER_PATHNAME } from '../router';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

function rememberUserInfo(values: LoginFormValues) {
  if (values.remember) {
    localStorage.setItem('username', values.username);
    localStorage.setItem('password', values.password);
  }
}
function deleteUserInfo() {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
}

function getUserInfoFromLocalStorage() {
  return {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
  };
}

function Login() {
  const [form] = Form.useForm();

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();
    if (userInfo.username && userInfo.password) {
      form.setFieldsValue(userInfo);
    }
  }, []);

  function onFinish(values: LoginFormValues) {
    if (values.remember) {
      rememberUserInfo(values);
    } else {
      deleteUserInfo();
    }
    console.log(values);
  }

  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <UserOutlined />
        </Title>
        <Title level={2}>登录</Title>
      </Space>
      <div className={styles.form}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
          form={form}
        >
          <Form.Item label='用户名' name='username'>
            <Input />
          </Form.Item>
          <Form.Item label='密码' name='password'>
            <Input />
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
