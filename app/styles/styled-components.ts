import * as styledComponents from 'styled-components';

// theme.ts
// your theme variables
export interface IThemeInterface {
  primary: string;
  warning: string;
  danger: string;
  componentBackground: string;
  componentBackgroundSecondary: string;
}

export const theme = {
  default: {
    colors: {
      primary: '#efa738',
      warning: '#F5A621',
      danger: '#FD4D75',
      green: '#1BD0A6',
      blue: '#3E71B3',
      textColorGrey: '#011d45',
      placeholderColor: '#DBDBDB',
      textColor: '#011d45',
      textColorPrimary: '#efa738',
      textColorSecondary: '#011d45',
      componentBackground: '#183054',
      componentBackgroundPrimary: '#efa738',
      componentBackgroundSecondary: '#011d45',
    },
  },
};
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
