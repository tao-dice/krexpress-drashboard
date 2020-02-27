/*
 * UserPage Messages
 *
 * This contains all the text for the UserPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserPage';

export default defineMessages({
  bankCode_kbank: {
    id: `${scope}.bankCode_kbank`,
    defaultMessage: 'ธนาคารกสิกรไทย',
  },
  bankCode_scb: {
    id: `${scope}.bankCode_scb`,
    defaultMessage: 'ธนาคารไทยพาณิชย์',
  },
  bankCode_bbl: {
    id: `${scope}.bankCode_bbl`,
    defaultMessage: 'ธนาคารกรุงเทพ',
  },
  bankCode_tmb: {
    id: `${scope}.bankCode_tmb`,
    defaultMessage: 'ธนาคารทหารไทย ทีเอ็มบี',
  },
  bankCode_ktb: {
    id: `${scope}.bankCode_ktb`,
    defaultMessage: 'ธนาคารกรุงไทย',
  },
  bankCode_bay: {
    id: `${scope}.bankCode_bay`,
    defaultMessage: 'ธนาคารกรุงศรีอยุธยา',
  },
});
