import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

const Log_In = gql`
  mutation($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      userId
      password
      role
      token
    }
  }
`;

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 33;
`;

const Wrapper = styled.article`
  width: 70%;
  height: 50%;
  padding: 10vmin 5vmin 5vmin;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  border-radius: 3vmin;
`;

const Form = styled.form`
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vmin;
`;

const UserId = styled.input`
  color: #000;
  width: 100%;
  height: 7vmin;
`;

const Password = styled.input`
  color: #000;
  width: 100%;
  height: 7vmin;
`;

const SubmitBtn = styled.button`
  color: #000;
  width: 100%;
  height: 7vmin;
`;

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(Log_In);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmitLogin = (event) => {
    event.preventDefault();
    if (data?.login) {
      login({
        variables: { userId, password },
      });
    } else if (!data?.login) {
      console.log('something wrong');
    }
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Form onSubmit={onSubmitLogin}>
            <UserId
              name="userId"
              value={userId}
              placeholder="아이디"
              onChange={onChangeInput}
              ref={inputRef}
              required
            />
            <Password
              name="password"
              value={password}
              placeholder="비밀번호"
              onChange={onChangeInput}
              required
            />
            <SubmitBtn type="submit" onClick={onSubmitLogin}>
              로그인
            </SubmitBtn>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
