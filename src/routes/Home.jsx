import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { ALL_DRAMAS } from '../apollo/gql';

import Drama from '../components/Drama';

import People from '../assets/main-bg.png';
import AddBtn from '../assets/AddBtn.png';

import useTitle from '../hooks/useTitle';

const Container = styled.main`
  width: 100vw;
  height: auto;
  @media all and (min-width: 1025px) {
    min-height: 100vh;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 30vmin;
  padding: 0 3vmin 3vmin;
  color: white;
  background-color: #f9f6f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10vmin;
  @media all and (min-width: 1025px) {
    height: 25vmax;
    padding: 0 10vmax 2.5vmax;
  }
`;

const BackgroundImg = styled.img`
  width: auto;
  height: 10vmin;
  @media all and (min-width: 1025px) {
    width: auto;
    height: 10vmax;
  }
`;

const Title = styled.h1`
  color: #f6ae9f;
  font-family: 'Cafe24Shiningstar', 'NEXON Lv2 Gothic Bold', sans-serif;
  font-size: 7vmin;
  font-weight: 600;
  position: relative;
  right: 10%;
  top: -40%;
  @media all and (min-width: 1025px) {
    right: 8%;
    font-size: 5vmax;
  }
`;

const Green = styled.span`
  color: #89c7aa;
`;

const Loading = styled.div`
  height: 100vh;
  font-size: 2vmax;
  opacity: 0.5;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dramas = styled.article`
  padding: 0 3vmin;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  column-gap: 3vmin;
  row-gap: 3vmin;
  position: relative;
  top: -3vmin;
  @media all and (min-width: 1025px) {
    padding: 0 10vmax;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 2vmax;
    row-gap: 2vmax;
    top: -2.5vmax;
  }
`;

const Edits = styled.aside`
  display: none;
  @media all and (min-width: 1025px) {
    display: block;
    position: fixed;
    width: 3vmax;
    height: 3vmax;
    right: 4vmax;
    bottom: 2vmax;
    filter: drop-shadow(0 0.1vmax 2px #000);
  }
`;

const Edit = styled.img`
  width: 100%;
  height: 100%;
`;

const Home = () => {
  const { loading, data } = useQuery(ALL_DRAMAS);

  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle('Web Drama Playground');
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Header>
            <BackgroundImg src={People}></BackgroundImg>
            <Title>
              <Green>웹드라마</Green> 찾아 삼만리
            </Title>
          </Header>
          <Dramas>
            {data?.allDramas.map((v) => (
              <Drama key={v._id} url={v.url} background={v.cover} />
            ))}
          </Dramas>
          <Edits>
            <Link to="/create">
              <Edit src={AddBtn}></Edit>
            </Link>
          </Edits>
        </>
      )}
    </Container>
  );
};

export default Home;
