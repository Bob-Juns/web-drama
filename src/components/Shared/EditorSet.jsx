import React from 'react';

// styles
import styled from 'styled-components';
import { size } from '../../styles/SharedStyle';
import device from '../../styles/MediaQuery';

export const EditorSet = ({ onSubmit, children }) => {
  return (
    <>
      <Editor onSubmit={onSubmit} autoComplete="off">
        {children}
      </Editor>
    </>
  );
};

const Editor = styled.form`
  width: 100%;
  height: 100%;

  padding: ${size.large} ${size.medium} ${size.medium};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${size.large};

  background-color: #fff;

  position: absolute;
  left: 0;
  bottom: 0;

  overflow: scroll;

  ${device.desktop`
    height: 100vh;

    justify-content: center;
    align-items: center;
    border-radius: 0;
  `}
`;
