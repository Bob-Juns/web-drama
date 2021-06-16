import React from 'react';

// styles
import styled from 'styled-components';
import device from '../../styles/MediaQuery';

const Editor = styled.form`
  width: 100%;
  height: 100%;

  padding: 30px 20px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;

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

export const EditorSet = ({ onSubmit, children }) => {
  return (
    <>
      <Editor onSubmit={onSubmit} autoComplete="off">
        {children}
      </Editor>
    </>
  );
};
