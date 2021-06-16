import React from 'react';
import styled from 'styled-components';
import loadingImg from '../../assets/loading.gif';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #f1f2f3;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.img`
  width: 80px;
`;

const Loading = () => {
  return (
    <Container>
      <Loader src={loadingImg} alt="loading image"></Loader>
    </Container>
  );
};

export default Loading;
