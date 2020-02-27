/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'lotto-select-draws';

export default defineMessages({
  'stock-set:round_1': {
    id: `${scope}.th-stock:round_1`,
    defaultMessage: 'เช้า',
  },
  'stock-set:round_2': {
    id: `${scope}.th-stock:round_2`,
    defaultMessage: 'เที่ยง',
  },
  'stock-set:round_3': {
    id: `${scope}.th-stock:round_3`,
    defaultMessage: 'บ่าย',
  },
  'stock-set:round_4': {
    id: `${scope}.th-stock:round_4`,
    defaultMessage: 'เย็น',
  },
  'stock-szse:round_1': {
    id: `${scope}.stock-szse:round_1`,
    defaultMessage: 'เช้า',
  },
  'stock-szse:round_2': {
    id: `${scope}.stock-szse:round_1`,
    defaultMessage: 'บ่าย',
  },
});
