/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */


import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';

import thTh from 'antd/es/locale-provider/th_TH';

import { makeSelectLocale } from './selectors';

export interface Props {
  messages: { [locale: string]: { [id: string]: string } };
  children?: React.ReactNode;
}

const stateSelector = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export default function LanguageProvider(props: Props) {
  const { locale } = useSelector(stateSelector);

  return (
    <IntlProvider
      locale="th"
      key={locale}
      messages={props.messages[locale]}
    >
      <ConfigProvider locale={thTh}>
        {React.Children.only(props.children)}
      </ConfigProvider>
    </IntlProvider>
  );
}
