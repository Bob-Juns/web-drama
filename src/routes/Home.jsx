import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import styled from 'styled-components';
import device from '../styles/MediaQuery';

// apollo
import { useQuery } from '@apollo/client';
import { ALL_DRAMAS } from '../apollo/gql';

// components
import Header from '../components/Header';
import Drama from '../components/Drama';
import Loading from '../components/Shared/Loading';

// assets
import AddBtn from '../assets/AddBtn.png';

// hooks
import useTitle from '../hooks/useTitle';

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
`;

const Dramas = styled.article`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 0.75rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  grid-gap: 0.75rem;

  position: relative;
  top: -4vmin;

  ${device.desktop`
    max-width: 900px;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    top: -3vmax;
  `}
`;

const Edits = styled.aside`
  width: 2rem;
  height: 2rem;

  position: fixed;
  right: 1rem;
  bottom: 1rem;

  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));
  z-index: 555;

  ${device.desktop`
    width: 3rem;
    height: 3rem;

    right: 2rem;
    bottom: 3rem;
  `}
`;

const EditButton = styled.img`
  width: 100%;
  height: 100%;
`;

const Home = () => {
  const { loading, data } = useQuery(ALL_DRAMAS);

  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle('Web Drama Playground');
  }, []);

  if (loading) return <Loading />;

  return (
    <Container>
      <Header />
      <Dramas>
        {data?.allDramas.map((item) => (
          <Drama key={item._id} url={item.url} background={item.cover} />
        ))}
      </Dramas>
      <Edits>
        <Link to="/create">
          <EditButton src={AddBtn} />
        </Link>
      </Edits>
    </Container>
  );
};

export default Home;
