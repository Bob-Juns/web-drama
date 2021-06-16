import React from 'react';
import styled from 'styled-components';
import device from '../../styles/MediaQuery';

import { Input, Textarea, File } from './InputSet';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  gap: 30px;

  ${device.desktop`
    height: fit-content;
  `}
`;

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  gap: 5px;

  ${device.desktop`
    max-width: 768px;
  `}
`;

const Text = styled.div`
  color: grey;
  font-size: 0.75rem;
  margin-right: auto;
`;

const Preview = styled.img`
  width: 100%;
  min-height: 80px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  ${device.desktop`
    min-height: 200px;
    `}
`;

export const TabContent = ({
  onChangeInput,
  onChangeFile,
  title,
  dramaUrl,
  youtube,
  summary,
  img1_title,
  video1,
  img2_title,
  video2,
  img3_title,
  video3,
  cover_preview,
  img1_preview,
  img2_preview,
  img3_preview,
}) => {
  return [
    {
      tab: '기본 정보',
      content: (
        <>
          <InputWrapper>
            <Input
              id="title"
              type="text"
              value={title}
              label="제목 (한글)"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
            <Input
              id="dramaUrl"
              type="text"
              value={dramaUrl}
              label="제목 (영어)"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
            <Textarea
              id="summary"
              value={summary}
              label="내용"
              onChange={onChangeInput}
            />
            <Input
              id="youtube"
              type="text"
              value={youtube}
              label="전체 비디오 링크"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
          </InputWrapper>
          <ImgWrapper>
            <Text>커버 이미지</Text>
            <Preview src={cover_preview} alt="cover image" />
            <File
              id="cover_file"
              onChange={onChangeFile}
              required={true}
              label="업로드"
            />
          </ImgWrapper>
        </>
      ),
    },
    {
      tab: 'VIDEO 1',
      content: (
        <>
          <InputWrapper>
            <Input
              id="img1_title"
              type="text"
              value={img1_title}
              label="첫번째 비디오 제목"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
            <Input
              id="video1"
              type="text"
              value={video1}
              label="첫번째 비디오 링크"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
          </InputWrapper>
          <ImgWrapper>
            <Text>첫번째 비디오 이미지</Text>
            <Preview src={img1_preview} alt="first video image" />
            <File
              id="img1_file"
              onChange={onChangeFile}
              required={true}
              label="업로드"
            />
          </ImgWrapper>
        </>
      ),
    },
    {
      tab: 'VIDEO 2',
      content: (
        <>
          <InputWrapper>
            <Input
              id="img2_title"
              type="text"
              value={img2_title}
              label="두번째 비디오 제목"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
            <Input
              id="video2"
              type="text"
              value={video2}
              label="두번째 비디오 링크"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
          </InputWrapper>
          <ImgWrapper>
            <Text>두번째 비디오 이미지</Text>
            <Preview src={img2_preview} alt="second video image" />
            <File
              id="img2_file"
              onChange={onChangeFile}
              required={true}
              label="업로드"
            />
          </ImgWrapper>
        </>
      ),
    },
    {
      tab: 'VIDEO 3',
      content: (
        <>
          <InputWrapper>
            <Input
              id="img3_title"
              type="text"
              value={img3_title}
              label="세번째 비디오 제목"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
            <Input
              id="video3"
              type="text"
              value={video3}
              label="세번째 비디오 링크"
              onChange={onChangeInput}
              required={true}
              readOnly={false}
            />
          </InputWrapper>
          <ImgWrapper>
            <Text>세번째 비디오 이미지</Text>
            <Preview src={img3_preview} alt="third video image" />
            <File
              id="img3_file"
              onChange={onChangeFile}
              required={true}
              label="업로드"
            />
          </ImgWrapper>
        </>
      ),
    },
  ];
};
