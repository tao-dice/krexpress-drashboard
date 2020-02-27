import React from 'react';
import { ThemeProvider, theme as defaultTheme } from 'styles/styled-components';

export interface Props {
  theme?: object;
  children?: any | React.ReactNode;
}

// Create a GreenSection component that renders its children wrapped in
// a ThemeProvider with a green theme
export const DefaultTheme = (props: Props) => {
  const { children, theme = {} } = props;
  return (
    // @ts-ignore
    <ThemeProvider theme={{ ...defaultTheme.default, ...theme }}>
      {children}
    </ThemeProvider>
  );
};

export default DefaultTheme;
