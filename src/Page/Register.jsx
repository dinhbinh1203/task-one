import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Button, Checkbox, Form, Input, Select, Modal, Row, Card } from 'antd';

import { Link } from 'react-router-dom';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const checkEmail = (obj, val) => {
  const result = !!obj.find(({ email }) => email === val.email);
  return result;
};

const checkUsername = (obj, val) => {
  const result = !!obj.find(({ username }) => username === val.username);
  return result;
};

const Register = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const listUser = JSON.parse(localStorage.getItem('listUser'));
    if (listUser == null) {
      const arr = [];
      arr.push(values);
      localStorage.setItem('listUser', JSON.stringify(arr));
      Modal.success({
        content: 'Đăng ký thành công',
      });
      form.resetFields();
    } else {
      if (!checkEmail(listUser, values) && !checkUsername(listUser, values)) {
        listUser.push(values);
        localStorage.setItem('listUser', JSON.stringify(listUser));
        Modal.success({
          content: 'Đăng ký thành công',
        });
        form.resetFields();
      } else if (
        !checkEmail(listUser, values) &&
        checkUsername(listUser, values)
      ) {
        Modal.warning({
          title: 'TÊN NGƯỜI DÙNG ĐÃ TỒN TẠI',
          content: 'Vui lòng đăng ký bằng tên khác',
        });
      } else if (
        checkEmail(listUser, values) &&
        !checkUsername(listUser, values)
      ) {
        Modal.warning({
          title: 'EMAIL ĐÃ SỬ DỤNG',
          content: 'Vui lòng đăng ký bằng email khác',
        });
      } else {
        Modal.warning({
          title: 'TÀI KHOẢN ĐÃ TỒN TẠI',
          content: 'Vui lòng đăng nhập hoặc đăng ký tài khoản khác',
        });
      }
    }
  };

  return (
    <>
      <div
        className="site-card-border-less-wrapper"
        style={{
          backgroundImage: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
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
            title="ĐĂNG KÝ"
            justify="center"
            align="middle"
            bordered={false}
            style={{
              width: 500,
            }}
          >
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập của bạn!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập email của bạn',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu của bạn!',
                  },
                  {
                    min: 6,
                    message: 'Vui lòng đặt mật khẩu dài hơn 6 ký tự ',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu của bạn!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Hai mật khẩu bạn nhập không giống nhau!'),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="gender" label="Giới tính">
                <Select placeholder="">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>Tôi đồng ý với điều khoản</Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <span
                  style={{
                    padding: '6px',
                  }}
                >
                  Bạn đã có tài khoản
                </span>
                <Link to="/login">Đăng nhập ngay!</Link>
              </Form.Item>
            </Form>
          </Card>
        </Row>
      </div>
    </>
  );
};

export default Register;
