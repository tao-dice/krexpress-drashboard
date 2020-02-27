import React, { memo, Suspense } from 'react';
import {
  Descriptions,
  Layout,
  PageHeader,
  Tabs,
  Form,
  Input,
  Row,
  Col,
  Select,
  Modal,
  Radio, Button, Divider, InputNumber,
} from 'antd';
import numeral from 'numeral';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';
import { trigger, mutate } from 'swr';
import { Link, useHistory } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorBoundary from '../../components/ErrorBoundary';
import qs from 'querystring';
import Text from '../../components/Text';
import moment from 'moment';
import { userEndpoint, useUserByUsername } from '../../hooks/useUsers';
import messages from './messages';
import request, { withAuthenticationHeader } from '../../utils/request';
import LinkMemberLabel from './LinkMemberLabel';

const { Option } = Select;
const { Content } = Layout;
const { TabPane } = Tabs;
const { confirm, error, success } = Modal;

interface Props {
}

const formItemLayout = {
  labelCol: {
    className: 'txt-left',
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
  },
};

const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 0 },
};
const UserGeneralForm = (props) => {
  const { data } = props;
  const { getFieldDecorator, validateFields } = props.form;
  const labelTxtColor = 'rgba(24, 48, 84, .56)';
  const resultBetAll = get(data.stat, 'betAll', 0);
  const withdraw = get(data.stat, 'withdraw', 0);
  const deposit = get(data.stat, 'deposit', 0);
  const advisorUsername = get(data.advisors, 'username');
  const onConfirm = async (payload) => {
    try {
      await request({
        method: 'PUT',
        url: `/api/users/${data.username}`,
        headers: withAuthenticationHeader({}),
        data: payload,
      });
      success({
        content: `ทำการบันทึกข้อมูลผู้ใช้งานสำเร็จ`,
      });
      mutate(`${userEndpoint}/${data.username}`, { ...data, payload });
      trigger(`${userEndpoint}/${data.username}`, false);
    } catch (e) {
      error({
        title: 'เกิดข้อผิดพลาด',
        content: JSON.stringify(e.response.data),
      });
      console.log('e', e.response);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    validateFields((error, fieldsValue) => {
      if (error) {
        return;
      }
      confirm({
        title: 'ข้อความยืนยันแก้ไขข้อมูลสมาชิก',
        content: `คุณต้องการแก้ไขข้อมูลสมาชิก ${data.username} ใช่หรือไม่`,
        onOk: () => onConfirm(fieldsValue),
        onCancel() {
        },
      });
    });
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmitForm}>
      <PageHeader
        style={{
          borderBottom: '1px solid rgb(235, 237, 240)',
          marginBottom: '2em',
        }}
        title="ข้อมูลสมาชิก"
      />
      <Row style={{ padding: '0 2em', maxWidth: '1200px' }}>
        <Col span={12}>
          <Form.Item label={<Text color={labelTxtColor}>ชื่อผู้ใช้งาน</Text>}>
            <Text fontWeight="bold" fontSize="14px">{data.username}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>ชื่อ - สกุล</Text>}>
            <Text fontWeight="bold" fontSize="14px">{data.bankAccount.name}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>LINE ID</Text>}>
            {getFieldDecorator('providers.line.id', {
              initialValue: get(data.providers, 'line.id', ''),
            })(<Input style={{ maxWidth: '300px' }} />)}
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>เบอร์ติดต่อ</Text>}>
            <Text fontWeight="bold">{data.phoneNumber}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>วันที่สมัคร</Text>}>
            <Text fontWeight="bold">{moment(data.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>เข้าใช้งานล่าสุด</Text>}>
            <Text fontWeight="bold">{moment(data.latestLogin).format('DD/MM/YYYY HH:mm:ss')}</Text>
          </Form.Item>
          <Form.Item label="สถานะ">
            {getFieldDecorator('status', {
              initialValue: data.status,
            })(
              <Radio.Group>
                <Radio value="active">เปิดใช้งาน</Radio>
                <Radio value="disabled">ระงับการใช้งาน</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={<Text color={labelTxtColor}>ผู้แนะนำ</Text>}>
            <LinkMemberLabel username={advisorUsername}>{advisorUsername}</LinkMemberLabel>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>ยอดฝาก</Text>}>
            <Text fontWeight="bold">{numeral(deposit).format('0,0.00')}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>ยอดถอน</Text>}>
            <Text fontWeight="bold">{numeral(withdraw).format('0,0.00')}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>รายได้</Text>}>
            <Text fontWeight="bold">{numeral(data.revenue).format('0,0.00')}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>เครดิต</Text>}>
            <Text fontWeight="bold">{numeral(data.credit).format('0,0.00')}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>ยอดเงิน</Text>}>
            <Text fontWeight="bold">{numeral(resultBetAll).format('0,0.00')}</Text>
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>ระดับผู้ใช้</Text>}>
            {getFieldDecorator('roles', {
              initialValue: data.roles,
              rules: [
                {
                  required: true,
                  message: 'Require',
                },
              ],
            })(
              <Select
                mode="tags"
                placeholder="Please select"
                onChange={() => null}
                style={{ maxWidth: '300px' }}
              >
                <Option value="admin">admin</Option>
                <Option value="system">system</Option>
                <Option value="user">users</Option>
                <Option value="ghost">ghost</Option>
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
      <PageHeader
        style={{
          borderBottom: '1px solid rgb(235, 237, 240)',
          marginBottom: '2em',
        }}
        title="ข้อมูลบัญชีธนาคาร (ลูกค้า)"
      />
      <Row style={{ padding: '0 2em', maxWidth: '1200px' }}>
        <Col span={12}>
          <Form.Item label={<Text color={labelTxtColor}>ธนาคาร</Text>}>
            {getFieldDecorator('bankAccount.code', {
              initialValue: data.bankAccount.code,
              rules: [
                {
                  required: true,
                  message: 'Require',
                },
              ],
            })(
              <Select
                placeholder="Please select"
                onChange={() => null}
                style={{ maxWidth: '300px' }}
              >
                <Option value="kbank">ธนาคารกสิกรไทย</Option>
                <Option value="scb">ธนาคารไทยพาณิชย์</Option>
                <Option value="bbl">ธนาคารกรุงเทพ</Option>
                <Option value="tmb">ธนาคารทหารไทย ทีเอ็มบี</Option>
                <Option value="ktb">ธนาคารกรุงไทย</Option>
                <Option value="bay">ธนาคารกรุงศรีอยุธยา</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>เลขบัญชี</Text>}>
            {getFieldDecorator('bankAccount.number', {
              initialValue: data.bankAccount.number,
              rules: [
                {
                  required: true,
                  message: 'Require',
                },
              ],
            })(<Input style={{ maxWidth: '300px' }} />)}
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>ชื่อบัญชี</Text>}>
            {getFieldDecorator('bankAccount.name', {
              initialValue: data.bankAccount.name,
              rules: [
                {
                  required: true,
                  message: 'Require',
                },
              ],
            })(<Input style={{ maxWidth: '300px' }} />)}
          </Form.Item>
          <Form.Item label={<Text color={labelTxtColor}>โค้วต้าถอน</Text>}>
            {getFieldDecorator('config.withdrawQuota', {
              initialValue: data.config.withdrawQuota,
              rules: [
                {
                  required: true,
                  message: 'Require',
                },
              ],
            })(<InputNumber max={20} min={5} style={{ maxWidth: '300px', width: '100%' }}
                            placeholder="default size" />)}
          </Form.Item>
        </Col>
      </Row>
      <PageHeader
        style={{
          borderBottom: '1px solid rgb(235, 237, 240)',
          marginBottom: '2em',
        }}
        title="บัญชีที่รับโอน (ฝากลูกค้า)"
      />
      <Row style={{ padding: '0 2em', maxWidth: '1200px' }}>
        <Col span={12}>
          {data.transferBank.accounts.map(bank => {
            return (
              <>
                <Text
                  color={labelTxtColor}
                >
                  บัญชี <FormattedMessage {...messages[`bankCode_${bank.bankCode}`]} />
                </Text> : <Text fontWeight="bold">
                {bank.id}, {bank.name}
              </Text>
              </>
            );
          })}
        </Col>
      </Row>
      <Divider />
      <Form.Item {...buttonItemLayout}>
        <Button
          size="large"
          type="primary"
          block
          style={{ minWidth: '200px' }}
          htmlType="submit"
        >
          บันทึกข้อมูล
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: 'user-general' })(UserGeneralForm);

const UserDataManager = (props) => {
  const history = useHistory();
  const { objectId } = props.match.params;
  const { data } = useUserByUsername(objectId, { suspense: true });
  const query: { tab?: string } = qs.parse(history.location.search.replace('?', ''));
  const breadcrumbName = `จัดการสมาชิก ${data.username}`;
  const routes = [
    {
      path: '/users',
      breadcrumbName: 'สมาชิก',
    },
    {
      path: '/users',
      breadcrumbName: 'รายการสมาชิก',
    },
    {
      path: `/users/manage/${objectId}`,
      breadcrumbName,
    },
  ];

  const handleTabChange = (tab) => {
    history.push({
      pathname: `/users/manage/${objectId}`,
      search: `?tab=${tab}`,
    });
  };

  return (
    <>
      <PageHeader
        style={{
          background: 'white',
        }}
        onBack={() => history.goBack()}
        title={breadcrumbName}
        breadcrumb={{
          itemRender: (route, params, routes, paths) => <Link to={route.path}>{route.breadcrumbName}</Link>,
          routes,
        }}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item>
            แก้ไข อัปเดท ข้อมูลสมาชิก
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Layout className="layout">
        <Content style={{ padding: '1em', margin: '1em 0', background: 'white' }}>
          <Tabs defaultActiveKey={query.tab || 'general'} onChange={handleTabChange}>
            <TabPane tab="ข้อมูลทั่วไป" key="general">
              <WrappedRegistrationForm {...props} data={data} objectId={objectId} />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </>
  );
};

function UserManager(props: Props) {
  return (
    <>
      <Suspense fallback={<LoadingIndicator />}>
        <UserDataManager {...props} />
        <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>} />
      </Suspense>
    </>
  );
}

export default memo(UserManager);
