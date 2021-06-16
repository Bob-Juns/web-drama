import React from 'react';

import styled from 'styled-components';
import { size, color } from '../styles/SharedStyle';
import device from '../styles/MediaQuery';

const Header = () => {
  return (
    <Container>
      <Title>
        <Green>Web Drama</Green> Playground
      </Title>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${color.beige};

  ${device.desktop`
    height: 300px;
  `}
`;

const Title = styled.h1`
  color: ${color.pink};
  font-family: 'baloo 2', sans-serif;
  font-size: calc(2 * ${size.base});
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${device.desktop`
    flex-direction: row;
    gap:${size.base};
    font-size: ${size.huge};
  `}
`;

const Green = styled.span`
  color: ${color.green};
`;

export default Header;
