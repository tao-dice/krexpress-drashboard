import React from 'react';
import { Icon, Spin } from 'antd';
import Text from './Text';

const LoadingIndicator = (props) => {
  const icon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin indicator={icon} />
      <Text tag="p">{props.children || 'กำลังโหลดข้อมูล....'} </Text>
    </div>
  );
};

export default LoadingIndicator;
