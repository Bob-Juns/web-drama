import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// styles
import styled from 'styled-components';
import { color } from '../styles/SharedStyle';

// components
import Editor from '../components/Editor';
import Loading from '../components/Shared/Loading';
import { Button } from '../components/Shared/ButtonSet';

// firebase
import { storage } from '../fbase';

// apollo
import { useMutation } from '@apollo/client';
import { ADD_DRAMA, ALL_DRAMAS } from '../apollo/gql';

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;

  background-color: #f9f6f0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Create = () => {
  const [dramaData, setDramaData] = useState({
    title: '',
    dramaUrl: '',
    summary: '',
    youtube: '',
    img1_title: '',
    img2_title: '',
    img3_title: '',
    video1: '',
    video2: '',
    video3: '',
  });

  const [files, setFiles] = useState({
    cover_file: '',
    img1_file: '',
    img2_file: '',
    img3_file: '',
  });

  const [preview, setPreview] = useState({
    cover_preview: '',
    img1_preview: '',
    img2_preview: '',
    img3_preview: '',
  });

  const {
    title,
    dramaUrl,
    summary,
    youtube,
    img1_title,
    img2_title,
    img3_title,
    video1,
    video2,
    video3,
  } = dramaData;

  const { cover_file, img1_file, img2_file, img3_file } = files;
  const { cover_preview, img1_preview, img2_preview, img3_preview } = preview;

  const history = useHistory();

  const [addDrama, { loading }] = useMutation(ADD_DRAMA, {
    refetchQueries: [{ query: ALL_DRAMAS }],
  });

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    if (id === 'title') {
      setDramaData({ ...dramaData, title: value });
    } else if (id === 'dramaUrl') {
      setDramaData({ ...dramaData, dramaUrl: value });
    } else if (id === 'summary') {
      setDramaData({ ...dramaData, summary: value });
    } else if (id === 'img1_title') {
      setDramaData({ ...dramaData, img1_title: value });
    } else if (id === 'img2_title') {
      setDramaData({ ...dramaData, img2_title: value });
    } else if (id === 'img3_title') {
      setDramaData({ ...dramaData, img3_title: value });
    } else if (id === 'video1') {
      setDramaData({ ...dramaData, video1: value });
    } else if (id === 'video2') {
      setDramaData({ ...dramaData, video2: value });
    } else if (id === 'video3') {
      setDramaData({ ...dramaData, video3: value });
    } else if (id === 'youtube') {
      setDramaData({ ...dramaData, youtube: value });
    }
  };

  const onChangeFile = (event) => {
    const { id } = event.target;
    const reader = new FileReader();

    if (id === 'cover_file') {
      const cover_file = event.target.files[0];
      reader.readAsDataURL(cover_file);
      reader.onloadend = (finishedEvent) => {
        const { result } = finishedEvent.currentTarget;
        setPreview({ ...preview, cover_preview: result });
      };
      setFiles({ ...files, cover_file });
    } else if (id === 'img1_file') {
      const img1_file = event.target.files[0];
      reader.readAsDataURL(img1_file);
      reader.onloadend = (finishedEvent) => {
        const { result } = finishedEvent.currentTarget;
        setPreview({ ...preview, img1_preview: result });
      };
      setFiles({ ...files, img1_file });
    } else if (id === 'img2_file') {
      const img2_file = event.target.files[0];
      reader.readAsDataURL(img2_file);
      reader.onloadend = (finishedEvent) => {
        const { result } = finishedEvent.currentTarget;
        setPreview({ ...preview, img2_preview: result });
      };
      setFiles({ ...files, img2_file });
    } else if (id === 'img3_file') {
      const img3_file = event.target.files[0];
      reader.readAsDataURL(img3_file);
      reader.onloadend = (finishedEvent) => {
        const { result } = finishedEvent.currentTarget;
        setPreview({ ...preview, img3_preview: result });
      };
      setFiles({ ...files, img3_file });
    }
  };

  const onSubmitCreate = async (event) => {
    event.preventDefault();

    let cover, image1, image2, image3;

    if (cover_file !== '') {
      const cover_ref = storage.ref().child(`${dramaUrl}/cover`);
      await cover_ref.put(cover_file);
      cover = await cover_ref.getDownloadURL();
    }
    if (img1_file !== '') {
      const img1_ref = storage.ref().child(`${dramaUrl}/image1`);
      await img1_ref.put(img1_file);
      image1 = await img1_ref.getDownloadURL();
    }
    if (img2_file !== '') {
      const img2_ref = storage.ref().child(`${dramaUrl}/image2`);
      await img2_ref.put(img2_file);
      image2 = await img2_ref.getDownloadURL();
    }
    if (img3_file !== '') {
      const img3_ref = storage.ref().child(`${dramaUrl}/image3`);
      await img3_ref.put(img3_file);
      image3 = await img3_ref.getDownloadURL();
    }

    await addDrama({
      variables: {
        title,
        url: dramaUrl,
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
    history.push('/');
  };

  const onClickClear = () => {
    setDramaData({
      ...dramaData,
      title: '',
      dramaUrl: '',
      summary: '',
      cover: '',
      youtube: '',
      image1: '',
      image2: '',
      image3: '',
      img1_title: '',
      img2_title: '',
      img3_title: '',
      video1: '',
      video2: '',
      video3: '',
    });
    setFiles({
      cover_file: '',
      img1_file: '',
      img2_file: '',
      img3_file: '',
    });
    setPreview({
      cover_preview: '',
      img1_preview: '',
      img2_preview: '',
      img3_preview: '',
    });
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Editor
        title={title || ''}
        dramaUrl={dramaUrl || ''}
        summary={summary || ''}
        youtube={youtube || ''}
        img1_title={img1_title || ''}
        img2_title={img2_title || ''}
        img3_title={img3_title || ''}
        video1={video1 || ''}
        video2={video2 || ''}
        video3={video3 || ''}
        cover_preview={cover_preview || ''}
        img1_preview={img1_preview || ''}
        img2_preview={img2_preview || ''}
        img3_preview={img3_preview || ''}
        onChangeInput={onChangeInput}
        onChangeFile={onChangeFile}>
        <Button
          textColor={color.red}
          backgroundColor="transparent"
          onClick={onClickCancel}
          text="취소"
          style={{ border: `1px solid ${color.red}` }}
        />
        <Button
          textColor="#fff"
          backgroundColor={color.green}
          onClick={onSubmitCreate}
          text="확인"
        />
      </Editor>
    </Container>
  );
};

export default Create;
