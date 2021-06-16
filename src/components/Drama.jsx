import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import device from '../styles/MediaQuery';

const Container = styled.section`
  width: 100%;
  height: 40vmin;
  border-radius: 7px;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  background-color: transparent;

  &:hover {
    transform: scale(1.05);
  }

  ${device.mobileLandscape`
    height: 35vmax;
    max-height: 300px;
  `}

  ${device.tablet`
    height: 35vmax;
    max-height: 300px;
  `}

  ${device.desktop`
    height: 24vmax;
    max-height: 260px;
  `}
`;

const Poster = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center center;

  border-radius: 7px;
`;

const Drama = ({ url, background }) => {
  return (
    <>
      <Container>
        <Link to={`/drama/${url}`}>
          <Poster background={background} />
        </Link>
      </Container>
    </>
  );
};

export default Drama;
