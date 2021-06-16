import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import styled from 'styled-components';
import { size } from '../styles/SharedStyle';
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

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
`;

const Dramas = styled.article`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 ${size.tiny};

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  grid-gap: ${size.tiny};

  position: relative;
  top: -4vmin;

  ${device.desktop`
    max-width: 900px;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: ${size.base};
    top: -3vmax;
  `}
`;

const Edits = styled.aside`
  width: calc(2 * ${size.base});
  height: calc(2 * ${size.base});

  position: fixed;
  right: ${size.base};
  bottom: ${size.base};

  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));
  z-index: 555;

  ${device.desktop`
    width: ${size.huge};
    height: ${size.huge};

    right: ${size.huge};
    bottom: ${size.huge};
  `}
`;

const EditButton = styled.img`
  width: 100%;
  height: 100%;
`;

export default Home;
