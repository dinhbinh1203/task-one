import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Button, Form, Input, Modal, Row } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

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

const showToastMessage = () => {
  toast.success('Thay đổi mật khẩu thành công !', {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const ChangePass = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const currentUser = await JSON.parse(localStorage.getItem('current-user'));
    let listUser = await JSON.parse(localStorage.getItem('listUser'));

    if (currentUser.password !== values.current_password) {
      Modal.error({
        title: 'This is an error message',
        content: 'Mật khẩu hiện tại nhập không đúng',
      });
    } else {
      const newUser = {
        ...currentUser,
        password: values.new_password,
        confirm: values.confirm_new_password,
      };

      for (let key in listUser) {
        if (listUser[key].username === newUser.username) {
          listUser[key] = newUser;
          localStorage.setItem('listUser', JSON.stringify(listUser));
          localStorage.setItem('current-user', JSON.stringify(newUser));
          form.resetFields();
          showToastMessage();
        }
      }
    }
  };

  return (
    <div
      className="site-card-border-less-wrapper"
      style={{
        backgroundImage: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
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
          title="Thay đổi mật khẩu"
          justify="center"
          align="middle"
          bordered={false}
          style={{
            width: 700,
            borderRadius: '14px',
          }}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            preserve={false}
          >
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Form.Item
              name="current_password"
              label="Mật khẩu hiện tại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu hiện tại',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="new_password"
              label="Mật khẩu mới"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu mới',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('current_password') !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Your new password must be different from previous used password',
                      ),
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm_new_password"
              label="Xác nhận mật khẩu mới"
              dependencies={['new-password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu mới',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Hai mật khẩu bạn đã nhập không khớp'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout} justify="end">
              <Button type="primary" htmlType="submit">
                Thay đổi mật khẩu
              </Button>
              <Link to="/">
                <Button
                  type="#f759ab"
                  htmlType="submit"
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  Về trang chủ
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default ChangePass;
