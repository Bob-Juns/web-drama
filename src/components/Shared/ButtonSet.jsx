import React from 'react';
import styled from 'styled-components';

const _Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};

  border-radius: 5px;
`;

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
