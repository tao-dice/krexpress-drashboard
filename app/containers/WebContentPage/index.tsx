import React, { memo, Suspense } from 'react';
import {
  Button,
  Descriptions,
  Layout,
  PageHeader,
  Tag,
  Modal,
} from 'antd';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import querystring from 'querystring';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorBoundary from 'components/ErrorBoundary';
import CustomTable from 'components/CustomTable';
import Text from 'components/Text';
import { usePageContent } from '../../hooks/usePageContent';
import request, { withAuthenticationHeader } from '../../utils/request';
import { trigger } from 'swr';

const { Content } = Layout;

const PageContent = (props) => {
  const { query } = props;
  const history = useHistory();
  const qs = querystring.stringify(query);
  const { data } = usePageContent(`?${qs}`, { suspense: true });
  const onConfirm = async (value) => {
    try {
      await request({
        method: 'DELETE',
        url: `/api/page-content/${value}`,
        headers: withAuthenticationHeader({}),
      });
      Modal.success({
        content: 'ทำการลบเนื้อหาสำเร็จ',
      });
      trigger(`/api/page-content?${qs}`);
    } catch (e) {
      console.log('e', e);
    }
  };
  const handleRemove = (value) => {
    Modal.confirm({
      title: 'ข้อความยืนยัน',
      content: `เมื่อลบเนื้อหาจะไม่สามารถนำกลับมาได้, ต้องการลบเนื้อหาที่เลือกใช่หรือไม่ ?`,
      onOk: () => onConfirm(value),
      okText: 'ยืนยันลย',
      okButtonProps: {
        type: 'danger',
      },
    });
  };
  const columns = [
    {
      title: 'การเข้าถึงเนื้อหา',
      width: '120px',
      align: 'center',
      key: 'accessibility',
      dataIndex: 'accessibility',
      render: (value) => {
        return value === 'public' ? (<Tag color="green">เปิดเผย</Tag>) : (<Tag color="grey">ส่วนตัว</Tag>);
      },
    },
    {
      title: 'หัวข้อ',
      width: '200px',
      key: 'title',
      dataIndex: 'title',
      render: (value) => {
        return <Text>{value}</Text>;
      },
    },
    {
      title: 'slug',
      width: '150px',
      key: 'slug',
      dataIndex: 'slug',
      render: (value) => {
        return <Text color="primary">/{value}</Text>;
      },
    },
    {
      title: 'วันที่สร้าง',
      width: '200px',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value) => {
        return <Text>{moment(value).format('lll')}</Text>;
      },
    },
    {
      title: 'แก้ไขล่าสุด',
      width: '200px',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (value) => {
        return <Text>{moment(value).format('lll')}</Text>;
      },
    },
    {
      title: 'การจัดการ',
      width: '120px',
      align: 'center',
      key: 'objectId',
      dataIndex: 'objectId',
      render: (value) => {
        return (
          <>
            <Button
              onClick={() => history.push(`/page-content/form/${value}`)}
              type="primary" size="small" style={{ margin: '0 4px' }}
            >
              แก้ไข
            </Button>
            <Button
              onClick={() => handleRemove(value)}
              type="danger" size="small" style={{ margin: '0 4px' }}
            >
              ลบเนื้อหา
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div
      style={{ maxWidth: '1400px' }}
    >
      <CustomTable
        bordered
        // @ts-ignore
        columns={columns}
        dataSource={data.records}
        size="middle"
        pagination={false}
      />
    </div>
  );
};

function WebContentPage(props) {
  const history = useHistory();
  const routes = [
    {
      path: '/page-content',
      breadcrumbName: 'จัดการเนื้อหา',
    },
  ];
  return (
    <>
      <PageHeader
        style={{
          background: 'white',
        }}
        onBack={() => history.goBack()}
        title="จัดการเนื้อหา"
        breadcrumb={{
          itemRender: (route, params, routes, paths) => <Link to={route.path}>{route.breadcrumbName}</Link>,
          routes,
        }}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item>
            เนื้อหาคอนเทนต์สำหรับแสดงบนหน้าเว็บไซต์ เช่นคู่มือ, วิธีการเล่น คำแนะนำ อื่นๆ
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Layout className="layout">
        <Content style={{ padding: '1em', margin: '1em 0', background: 'white' }}>
          <PageHeader
            style={{
              borderBottom: '1px solid rgb(235, 237, 240)',
            }}
            title="รายการเนื้อหา"
            extra={[
              <Link key="link" to="/page-content/form">
                <Button key="btn-create" type="primary" href="">สร้างเนื้อหาใหม่</Button>
              </Link>,
            ]}
          />
          <Suspense fallback={<LoadingIndicator />}>
            <PageContent
              {...props}
              query={{ page: 1 }}
            />
            <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>} />
          </Suspense>
        </Content>
      </Layout>
    </>
  );
}

export default memo(WebContentPage);
