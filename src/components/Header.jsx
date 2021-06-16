import React from 'react';

import styled from 'styled-components';
import device from '../styles/MediaQuery';

const Container = styled.header`
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f9f6f0;

  ${device.desktop`
    height: 300px;
  `}
`;

const Title = styled.h1`
  color: #f6ae9f;
  font-family: 'baloo 2', sans-serif;
  font-size: 2rem;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${device.desktop`
    flex-direction: row;
    gap: 1rem;
    font-size: 3rem;
  `}
`;

const Green = styled.span`
  color: #89c7aa;
`;

const Header = () => {
  return (
    <Container>
      <Title>
        <Green>Web Drama</Green> Playground
      </Title>
    </Container>
  );
};

export default Header;
