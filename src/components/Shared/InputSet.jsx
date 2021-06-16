import React from 'react';
import styled from 'styled-components';

import device from '../../styles/MediaQuery';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  }
`;

const Label = styled.label`
  width: 100%;
  font-size: 0.75rem;
  color: grey;
  display: flex;
  align-items: center;
`;

const _Input = styled.input`
  width: 100%;
  height: fit-content;
  padding: 10px 5px;
  font-size: 1rem;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  &:focus {
    border: 1px solid #8bc7ab;
  }
`;

const _Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px 5px;
  font-size: 1rem;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  &:focus {
    border: 1px solid #8bc7ab;
  }

  ${device.desktop`
    min-height: 170px;
  `}
`;
export const Input = ({
  label,
  id,
  type,
  value,
  onChange,
  required,
  readOnly,
}) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <_Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
    </Container>
  );
};

export const Textarea = ({ label, id, value, onChange }) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <_Textarea id={id} value={value} onChange={onChange} required />
    </Container>
  );
};

const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  border: 0;
`;

const FileLabel = styled.label`
  width: 70px;
  height: fit-content;
  padding: 10px 5px;
  color: #fff;
  text-align: center;
  background-color: #8bc7ab;
  cursor: pointer;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const File = ({ id, onChange, required, label }) => {
  return (
    <>
      <FileInput
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        required={required}
      />
      <FileLabel htmlFor={id}>{label}</FileLabel>
    </>
  );
};
