import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { storage } from '../fbase';

import { useMutation } from '@apollo/client';
import { ADD_DRAMA, ALL_DRAMAS } from '../apollo/gql';

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  background-color: #f9f6f0;
  padding: 5vmax;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Wrapper = styled.article`
  width: 100%;
  padding: 3vmax;
  border-radius: 2vmax;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: calc(100% / 3 - 2.5vmax);
  margin-bottom: 3vmax;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Input = styled.input`
  width: calc(100% / 3 - 2.5vmax);
  height: 3vmax;
  border: none;
  border-bottom: 0.5px solid #000;
  margin-bottom: 3vmax;
  &:focus {
    color: #89c7aa;
    border-bottom: 2px solid #89c7aa;
  }
`;

const Label = styled.label`
  width: 100%;
  font-size: 0.8vmax;
  color: #757575;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1vmax;
`;

const File = styled.input`
  width: 100%;
  border: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 5vmax;
  border: none;
  border-bottom: 0.5px solid #000;
  margin-bottom: 2vmax;
  &:focus {
    color: #89c7aa;
    border-bottom: 2px solid #89c7aa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1vmax;
`;

const CreateBtn = styled.button`
  color: #fff;
  background-color: #89c7aa;
  width: 8vmax;
  height: 3vmax;
  margin-right: 1vmax;
  border-radius: 0.5vmax;
`;

const CancelBtn = styled(CreateBtn)`
  background-color: red;
`;

const Create = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [youtube, setYoutube] = useState('');
  const [img1_title, setImg1_title] = useState('');
  const [img2_title, setImg2_title] = useState('');
  const [img3_title, setImg3_title] = useState('');
  const [video1, setVideo1] = useState('');
  const [video2, setVideo2] = useState('');
  const [video3, setVideo3] = useState('');

  const [coverFile, setCoverFile] = useState('');
  const [image1File, setImage1File] = useState('');
  const [image2File, setImage2File] = useState('');
  const [image3File, setImage3File] = useState('');

  const history = useHistory();

  const [addDrama] = useMutation(ADD_DRAMA, {
    refetchQueries: [{ query: ALL_DRAMAS }],
  });

  const onChangeFile = (event) => {
    const { id } = event.target;
    const reader = new FileReader();

    if (id === 'cover') {
      const coverFile = event.target.files[0];
      reader.readAsDataURL(coverFile);
      setCoverFile(coverFile);
    } else if (id === 'image1') {
      const image1File = event.target.files[0];
      reader.readAsDataURL(image1File);
      setImage1File(image1File);
    } else if (id === 'image2') {
      const image2File = event.target.files[0];
      reader.readAsDataURL(image2File);
      setImage2File(image2File);
    } else if (id === 'image3') {
      const image3File = event.target.files[0];
      reader.readAsDataURL(image3File);
      setImage3File(image3File);
    }
  };

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    if (id === 'title') {
      setTitle(value);
    } else if (id === 'url') {
      setUrl(value);
    } else if (id === 'summary') {
      setSummary(value);
    } else if (id === 'youtube') {
      setYoutube(value);
    } else if (id === 'img1_title') {
      setImg1_title(value);
    } else if (id === 'img2_title') {
      setImg2_title(value);
    } else if (id === 'img3_title') {
      setImg3_title(value);
    } else if (id === 'video1') {
      setVideo1(value);
    } else if (id === 'video2') {
      setVideo2(value);
    } else if (id === 'video3') {
      setVideo3(value);
    }
  };

  const onSubmitCreate = async (event) => {
    event.preventDefault();

    let cover;
    let image1;
    let image2;
    let image3;

    if (coverFile !== '') {
      const coverRef = storage.ref().child(`${url}/cover`);
      await coverRef.put(coverFile);
      cover = await coverRef.getDownloadURL();
    }
    if (image1File !== '') {
      const image1Ref = storage.ref().child(`${url}/image1`);
      await image1Ref.put(image1File);
      image1 = await image1Ref.getDownloadURL();
    }
    if (image2File !== '') {
      const image2Ref = storage.ref().child(`${url}/image2`);
      await image2Ref.put(image2File);
      image2 = await image2Ref.getDownloadURL();
    }
    if (image3File !== '') {
      const image3Ref = storage.ref().child(`${url}/image3`);
      await image3Ref.put(image3File);
      image3 = await image3Ref.getDownloadURL();
    }

    await addDrama({
      variables: {
        title,
        url,
        summary,
        cover,
        youtube,
        image1,
        image2,
        image3,
        img1_title,
        img2_title,
        img3_title,
        video1,
        video2,
        video3,
      },
    });

    history.push('/');
  };

  const onClickCancel = () => {
    history.goBack();
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Form onSubmit={onSubmitCreate} autocomplete="off">
            <Input
              id="title"
              type="text"
              value={title}
              placeholder="제목 (한글)"
              onChange={onChangeInput}
              required
            />

            <Input
              id="url"
              type="text"
              value={url}
              placeholder="제목 (영어)"
              onChange={onChangeInput}
              required
            />
            <Input
              id="youtube"
              type="text"
              value={youtube}
              placeholder="전체 비디오 링크"
              onChange={onChangeInput}
              required
            />

            <Textarea
              id="summary"
              value={summary}
              placeholder="내용"
              onChange={onChangeInput}
              required
            />

            <Input
              id="img1_title"
              type="text"
              value={img1_title}
              placeholder="첫번째 비디오 제목"
              onChange={onChangeInput}
              required
            />

            <Input
              id="img2_title"
              type="text"
              value={img2_title}
              placeholder="두번째 비디오 제목"
              onChange={onChangeInput}
              required
            />

            <Input
              id="img3_title"
              type="text"
              value={img3_title}
              placeholder="세번째 비디오 제목"
              onChange={onChangeInput}
              required
            />

            <Input
              id="video1"
              type="text"
              value={video1}
              placeholder="첫번째 비디오 링크"
              onChange={onChangeInput}
              required
            />

            <Input
              id="video2"
              type="text"
              value={video2}
              placeholder="두번째 비디오 링크"
              onChange={onChangeInput}
              required
            />

            <Input
              id="video3"
              type="text"
              value={video3}
              placeholder="세번째 비디오 링크"
              onChange={onChangeInput}
              required
            />
            <InputWrapper>
              <Label htmlFor="image1">첫번째 비디오 이미지</Label>
              <File
                id="image1"
                type="file"
                accept="image/*"
                onChange={onChangeFile}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="image2">두번째 비디오 이미지</Label>
              <File
                id="image2"
                type="file"
                accept="image/*"
                onChange={onChangeFile}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="image3">세번째 비디오 이미지</Label>
              <File
                id="image3"
                type="file"
                accept="image/*"
                onChange={onChangeFile}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="cover">커버 이미지</Label>
              <File
                id="cover"
                type="file"
                accept="image/*"
                onChange={onChangeFile}
                required
              />
            </InputWrapper>
          </Form>
        </Wrapper>
        <ButtonGroup>
          <CreateBtn onClick={onSubmitCreate}>생성하기</CreateBtn>
          <CancelBtn onClick={onClickCancel}>취소하기</CancelBtn>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default Create;
