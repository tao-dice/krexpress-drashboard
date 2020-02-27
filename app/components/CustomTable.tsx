import { Table } from 'antd';
import styled from 'styles/styled-components';
// language=SCSS prefix=&{ suffix=}
const CustomTable = styled(Table)`
    .ant-table-content {
      //min-width: 1200px;

    }
    &.ant-table-wrapper {
      //overflow-x: auto;
    }
    .ant-table-thead > tr > th {
      font-weight: 600;
      color: #595959;
    }

    .ant-table-small > .ant-table-content > .ant-table-body {
      margin: 0;
    }
`;
export default CustomTable;
