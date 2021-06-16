import React from 'react';

import styled from 'styled-components';
import { size, color } from '../../styles/SharedStyle';

import loadingImg from '../../assets/loading.gif';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${color.light};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.img`
  width: calc(3 * ${size.large});
`;

const Loading = () => {
  return (
    <Container>
      <Loader src={loadingImg} alt="loading image"></Loader>
    </Container>
  );
};

export default Loading;
