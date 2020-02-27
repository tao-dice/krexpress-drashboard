import React, { useState } from 'react';
import {
  Icon,
  Modal,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import Text from './Text';

// @ts-ignore
const InternalServerError = (errors) => {
  Modal.error({
    title: 'เกิดข้อผิดพลาดจาก Server',
    content: (
      <>
        กรุณาติดต่อเจ้าหน้าที่ : <ViewMoreErrorLog errors={errors} />
      </>
    ),
  });
};
const ViewMoreErrorLog = (props) => {
  const { errors } = props;
  const [state, setState] = useState({ expand: false });
  return (
    <>
      <Text
        color="blue"
        tag="p"
        my="10px"
        style={{ cursor: 'pointer' }}
        onClick={() => setState({ ...state, expand: !state.expand })}
      >
        {state.expand ? 'ซ่อนข้อผิดพลาด' : 'ดูข้อผิดพลาด'}
        {state.expand ? <Icon type="caret-up" /> : <Icon type="caret-down" />}

      </Text>
      {state.expand && JSON.stringify(errors.data)}
    </>
  );
};
const HttpErrorHandler = (errors) => {
  if (errors.status === 500) {
    return InternalServerError(errors);
  }
  if (errors.status === 400) {
    Modal.error({
      title: '[ERR400] ข้อมูลไม่ถูกต้อง',
      content: (
        <>
          เกิดข้อผิดพลาดจากข้อมูลที่ส่งขึ้นเซิฟเวอร์ : <ViewMoreErrorLog errors={errors} />
        </>
      ),
    });
  }
  return <></>;
};
export default HttpErrorHandler;
