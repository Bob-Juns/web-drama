import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.section`
  width: auto;
  height: 40vmin;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
  &:hover {
    transform: scale(1.05);
  }
  @media all and (min-width: 1025px) {
    height: 24vmax;
    border-radius: 7px;
  }
`;

const Poster = styled.div`
  background-image: url(${(props) => props.background});
  height: 100%;
  width: 100%;
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
