import numeral from 'numeral';

interface IPositiveOption {
  format?: numeral.format;
  colors?: [string, string];
}

export const getPositiveNumberProps = (n, option: IPositiveOption) => {
  const {
    format = '0,0.[00]',
    colors = ['#1BD0A6', '#FD4D75'],
  } = option;
  if (n > 0) {
    return {
      color: colors[0],
      children: `+${numeral(n).format(format)}`,
    };
  }
  if (n < 0) {
    return {
      color: colors[1],
      children: `${numeral(n).format(format)}`,
    };
  }
  return {
    color: '#183054',
    children: `${numeral(n).format(format)}`,
  };
};
