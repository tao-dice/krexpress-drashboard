import React, { memo, Suspense, useState } from 'react';
import { Descriptions, Input, Layout, PageHeader } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import get from 'lodash/get';
import CustomTable from 'components/CustomTable';
import Text from 'components/Text';
import ErrorBoundary from 'components/ErrorBoundary';
import LoadingIndicator from 'components/LoadingIndicator';
import { useUsers } from '../../hooks/useUsers';
import { getPositiveNumberProps } from '../App/utils';
import LinkMemberLabel from './LinkMemberLabel';

const { Content } = Layout;

interface Props {
}

interface IUTableListProps {
  page?: number;
  search?: string;
  onPaginationChange: (page: number) => void;
}

const UserTableList = (props: IUTableListProps) => {
  const {
    onPaginationChange,
    search,
    page,
  } = props;
  const { data } = useUsers(`?page=${page}&s=${search}`, { suspense: true });
  const { count, records } = data;
  const columns = [
    {
      title: 'ชื่อผู้ใช้งาน',
      width: '150px',
      key: 'username',
      dataIndex: 'username',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'เครดิต',
      align: 'right',
      key: 'credit',
      dataIndex: 'credit',
      render: (text) => <Text>{numeral(text).format('0,0.00')}</Text>,
    },
    {
      title: 'ยอดเงิน',
      align: 'right',
      key: 'stat.resultBetAll',
      dataIndex: 'stat.resultBetAll',
      render: (value) => (
        <Text fontWeight="bold" {...getPositiveNumberProps(value, {
          colors: ['blue', 'danger'],
          format: '0,0.00',
        })} />
      ),
    },
    {
      title: 'ชื่อ-สกุล',
      width: '200px',
      key: 'bankAccount.name',
      dataIndex: 'bankAccount.name',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'เบอร์ติดต่อ',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'LINE ID',
      key: 'social.lineID',
      dataIndex: 'social.lineID',
      render: (text) => text ? <Text>{text}</Text> : '-',
    },
    {
      title: 'ผู้แนะนำ',
      key: 'advisors',
      dataIndex: 'advisors', // TODO : display advisor first of array
      render: (advisors, row) => {
        const advisor = get(advisors, 'username', null);
        if (advisor) {
          return <LinkMemberLabel username={advisor}>{advisor}</LinkMemberLabel>;
        }
        return <Text>- ไม่มีผู้แนะนำ -</Text>;
      },
    },
    {
      title: 'เข้าใช้งานล่าสุด',
      key: 'latestLogin',
      dataIndex: 'latestLogin', // TODO : display advisor first of array
      render: (text) => <Text>{moment(text).format('DD/MM/YY, HH:mm:ss')}</Text>,
    },
    {
      title: 'ดำเนินการ',
      key: 'username',
      align: 'center',
      dataIndex: 'username', // TODO : display advisor first of array
      render: (username) => <Link to={`/users/manage/${username}`}><Text color="blue">จัดการข้อมูล</Text></Link>,
    },
  ];
  const dataSource = records;
  return (
    <CustomTable
      // @ts-ignore
      columns={columns}
      bordered
      dataSource={dataSource}
      size="middle"
      pagination={{
        current: page,
        total: count,
        pageSize: 20,
        onChange: onPaginationChange,
      }}
    />
  );
};

function UserPage(props: Props) {
  const history = useHistory();
  const [query, setQuery] = useState({ page: 1, search: '' });
  const routes = [
    {
      path: '/users',
      breadcrumbName: 'สมาชิก',
    },
    {
      path: '/users',
      breadcrumbName: 'รายการสมาชิก',
    },
  ];
  return (
    <>
      <PageHeader
        style={{
          background: 'white',
        }}
        onBack={() => history.push('/')}
        title="รายการสมาชิก"
        breadcrumb={{
          itemRender: (route, params, routes, paths) => <Link to={route.path}>{route.breadcrumbName}</Link>,
          routes,
        }}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item>
            รายการข้อมูลสมาชิกในระบบ
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Layout className="layout">
        <Content style={{ padding: '1em', margin: '1em 0', background: 'white' }}>
          <PageHeader
            style={{
              borderBottom: '1px solid rgb(235, 237, 240)',
            }}
            title="ค้นหาสมาชิก"
            extra={[
              <Input.Search
                key="1"
                placeholder="ค้นหาสมาชิก"
                onSearch={(value) => setQuery({ ...query, search: value })}
              />,
            ]}
          />
          <Suspense fallback={<LoadingIndicator />}>
            <UserTableList
              onPaginationChange={(n) => setQuery({ ...query, page: n })}
              {...query}
            />
            <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>} />
          </Suspense>
        </Content>
      </Layout>
    </>
  );
}

export default memo(UserPage);
