import React from 'react';

import styled from 'styled-components';
import { size } from '../../styles/SharedStyle';

export const Button = ({
  text,
  textColor,
  backgroundColor,
  onClick,
  style,
}) => {
  return (
    <_Button
      textColor={textColor}
      backgroundColor={backgroundColor}
      onClick={onClick}
      style={style}>
      {text}
    </_Button>
  );
};

const _Button = styled.button`
  width: fit-content;
  padding: ${size.tiny} ${size.medium};
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};

  border-radius: 5px;
`;
