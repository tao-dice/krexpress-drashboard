/**
 *
 * LoginPage
 *
 */
import React, { Fragment, memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import {
  Form,
  Input,
  Icon,
  Button,
} from 'antd';
import store from 'store2';
import LoginLayout from '../../components/LoginLayout';
import logoImg from '../../images/icon-512x512.png';
import Text from '../../components/Text';
import request from '../../utils/request';

// language=SCSS prefix=&{ suffix=}
const WrapperForm = styled.div`
    flex: 1 1;

    .ant-form {
      padding: 1em;
      border-radius: 6px;
      background: white;
      margin: 0 auto;
      width: 368px;
    }
`;
// language=SCSS prefix=&{ suffix=}
const LoginButton = styled(Button)`
    margin-top: 24px;
    width: 100%;
`;
// language=SCSS prefix=&{ suffix=}
const LogoApp = styled.div`
    padding: 2em 0;
    text-align: center;

`;
const FormItem = Form.Item;

export const FORM_NAME = 'loginForm';
const LoginForm = (props) => {
  const { getFieldDecorator, validateFields, getFieldsError } = props.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields(async (errors, values) => {
      if (errors) {
        return;
      }
      const response = await request({
        url: '/authentication',
        method: 'POST',
        data: {
          strategy: 'local',
          ...values,
        },
      });
      store.set('jwtToken', response.accessToken);
      // Cookies.set('jwtToken', response.accessToken);
      window.location.href = '/';
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        label={(
          <Text>ชื่อผู้ใช้งาน</Text>
        )}
      >
        {getFieldDecorator('username', {
          initialValue: '',
          rules: [
            {
              required: true,
              message: 'Require',
            },
          ],
        })(
          <Input
            placeholder="Username"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            size="large"
          />,
        )}
      </FormItem>
      <FormItem
        label={(
          <Text>รหัสผ่าน</Text>
        )}
      >
        {getFieldDecorator('password', {
          initialValue: '',
          rules: [
            {
              required: true,
              message: 'Require',
            },
          ],
        })(
          <Input.Password
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            size="large"
          />,
        )}
      </FormItem>
      <FormItem>
        <LoginButton
          type="primary"
          htmlType="submit"
          size="large"
          className="login-form-button"
          style={{ width: '100%' }}
        >
          ลงชื่อเข้าสู่ระบบ
        </LoginButton>
      </FormItem>
    </Form>
  );
};
const WrapperLoginForm = Form.create({ name: FORM_NAME })(LoginForm);
/* eslint-disable react/prefer-stateless-function */
export const LoginPage = () => {
  return (
    <LoginLayout>
      <Fragment>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" async defer />
          <title>ลงชื่อเข้าใช้</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <LogoApp>
          <img src={logoImg} width="120px" />
          <Text tag="p" mt="1em" color="#011d45">ระบบบริหารจัดการ การขนส่งสินค้า ไทย-ญี่ปุ่น</Text>
        </LogoApp>
        <WrapperForm>
          <WrapperLoginForm />
        </WrapperForm>
      </Fragment>
    </LoginLayout>
  );
};
export default memo(LoginPage);
