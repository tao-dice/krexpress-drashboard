import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styles/styled-components';
import {
  fontSize,
  fontWeight,
  space,
  color,
  display,
} from 'styled-system';

const e = React.createElement;
// language=SCSS prefix=&{ suffix=}
const Text = styled(({ tag, children, ...props }) => e(tag, props, children))`
  ${color}
  ${space}
  ${display}
  ${fontSize}
  ${fontWeight}
`;

Text.defaultProps = {
  tag: 'span',
};

Text.propTypes = {
  tag: PropTypes.string,
};
export default Text;
