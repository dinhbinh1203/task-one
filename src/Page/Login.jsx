import React from 'react';
import { Button, Form, Input, Row, Card, Modal } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const listUser = await JSON.parse(localStorage.getItem('listUser'));
    let i = 0;
    const lengthList = listUser.length;
    let check = false;
    for (i = 0; i < lengthList; i++) {
      if (
        listUser[i].password === values.password &&
        listUser[i].username === values.username
      ) {
        localStorage.setItem('current-user', JSON.stringify(listUser[i]));
        Modal.success({
          content: 'Đăng nhập thành công!',
        });
        navigate('/');
        check = true;
      } else if (
        listUser[i].password !== values.password &&
        listUser[i].username === values.username
      ) {
        Modal.error({
          title: 'SAI MẬT KHẨU',
          content: 'Vui lòng nhập lại mật khẩu!',
        });
        console.log('loi 1');
        check = true;
      }
    }

    if (check === false) {
      Modal.error({
        title: 'TÀI KHOẢN KHÔNG TỒN TẠI',
        content: 'Vui lòng đăng ký tài khoản!',
      });
    }
  };

  return (
    <div
      className="site-card-border-less-wrapper"
      style={{
        backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          height: '100vh',
          backgroundSize: 'contain',
        }}
      >
        <Card
          title="ĐĂNG NHẬP"
          justify="center"
          align="middle"
          bordered={false}
          style={{
            width: 500,
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập của bạn!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập khẩu của bạn!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
              <span
                style={{
                  padding: '6px',
                }}
              >
                hoặc
              </span>
              <Link to="/register">Đăng ký ngay!</Link>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default Login;
