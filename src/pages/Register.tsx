import { UserAddOutlined } from '@ant-design/icons';
import { Space, Typography, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Register.module.scss';

import { LOGIN_PATHNAME } from '../router';
const { Title } = Typography;

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

function Register() {
  function onFinish(values: RegisterFormValues) {
    console.log(values);
  }

  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>注册</Title>
      </Space>
      <div className={styles.form}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
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
            label='确认密码'
            name='confirmPassword'
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label='昵称' name='nickname'>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
