import { Row, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          height: '100vh',
        }}
      >
        <Link to="/change-pass">
          <Button>Thay đổi mật khẩu</Button>
        </Link>
      </Row>
    </div>
  );
};
