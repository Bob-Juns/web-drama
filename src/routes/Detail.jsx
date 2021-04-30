import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { storage } from '../fbase';

import { useQuery, useMutation } from '@apollo/client';
import {
  REMOVE_DRAMA,
  UPDATE_DRAMA,
  GET_DRAMA,
  ALL_DRAMAS,
} from '../apollo/gql';

import EditImg from '../assets/edit.png';

import useTitle from '../hooks/useTitle';

const Background = styled.main`
  width: 100vw;
  min-height: 100vh;
  background-color: #282c35;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (min-width: 1025px) {
    min-height: 0;
    height: 100vh;
    padding: 0 5vmax;
  }
`;

const Loading = styled.div`
  font-size: 2vmax;
  color: #fff;
`;

const Wrapper = styled.article`
  width: 100%;
  height: 100%;
  padding: 10vmin 5vmin 5vmin;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  @media all and (min-width: 1025px) {
    width: 100%;
    height: 80%;
    padding: 0;
    flex-direction: row;
    border-radius: 20px;
    background-color: #181d23;
  }
`;

const Covers = styled.section`
  width: 100%;
  height: 70vh;
  margin-bottom: 6vmin;
  @media all and (min-width: 1025px) {
    width: 40%;
    height: 100%;
  }
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.cover});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  @media all and (min-width: 1025px) {
    background-image: url(${(props) => props.cover});
    border-radius: 20px;
  }
`;

const Description = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media all and (min-width: 1025px) {
    width: 60%;
    padding: 3.5vmax 3.5vmax 1vmax;
  }
`;

const EditBtn = styled.img`
  display: none;
  cursor: pointer;
  @media all and (min-width: 1025px) {
    display: block;
    width: 2vmax;
    height: 2vmax;
    position: absolute;
    top: 2vmax;
    right: 6vmax;
  }
`;

const GoBack = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 4vmin;
  right: 5vmin;
  font-size: 3vmin;
  cursor: pointer;
  color: #fff;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  @media all and (min-width: 1025px) {
    width: 100%;
    position: relative;
    font-size: 1vmax;
    top: -1vmax;
    right: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 40%;
  margin-bottom: 6vmin;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2vmin;
  @media all and (min-width: 1025px) {
    gap: 3vmax;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 4vmin;
  margin-bottom: 2vmin;
  @media all and (min-width: 1025px) {
    font-size: 3vmax;
    margin-bottom: 3vmax;
  }
`;

const Summary = styled.p`
  color: #fff;
  font-size: 2.5vmin;
  text-align: justify;
  line-height: 1.3;
  @media all and (min-width: 1025px) {
    font-size: 1.3vmax;
  }
`;

const Subtitles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5vmax;
  @media all and (min-width: 1025px) {
  }
`;

const Subtitle = styled.h3`
  color: #fff;
  font-size: 3vmin;
  display: flex;
  align-items: flex-end;
  @media all and (min-width: 1025px) {
    font-size: 1.6vmax;
  }
`;

const SeeAll = styled.div`
  font-size: 3vmin;
  color: #fff;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  @media all and (min-width: 1025px) {
    font-size: 1vmax;
  }
`;

const Link = styled.a`
  display: block;
  margin-right: 2vmin;
  &:last-child {
    margin-right: 0;
  }
  @media all and (min-width: 1025px) {
    margin-right: .5vmax;

  }
  }
`;

const Videos = styled.div`
  display: flex;
  flex-direction: column;
  justify: space-between;
  margin-top: auto;
`;

const Links = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Image = styled.div`
  width: 28vmin;
  height: 16vmin;
  margin-bottom: 2vmin;
  border-radius: 6px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
  &:hover {
    transform: scale(1.02);
  }
  @media all and (min-width: 1025px) {
    width: 15vmax;
    height: 9vmax;
    margin-bottom: 1vmax;
    border-radius: 10px;
  }
`;

const ListTitle = styled.div`
  width: 27vmin;
  color: #fff;
  opacity: 0.8;
  font-size: 2.5vmin;
  text-align: center;
  &:hover {
    opacity: 1;
  }
  @media all and (min-width: 1025px) {
    width: 15vmax;
    font-size: 1vmax;
  }
`;

const EditModal = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5vmax;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Editor = styled.div`
  width: 100%;
  min-height: 90%;
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
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  width: calc(100% / 3 - 2.5vmax);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

const ReadOnly = styled.input`
  width: calc(100% / 3 - 2.5vmax);
  height: 3vmax;
  border: none;
  border-bottom: 0.5px solid #000;
  margin-bottom: 3vmax;
  &:last-child {
    margin-bottom: 0;
  }
  &:focus {
    color: red;
    border-bottom: 2px solid red;
  }
`;

const Label = styled.label`
  width: 100%;
  font-size: 1vmax;
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

const UpdateImage = styled.button`
  width: 10vmax;
  height: 3vmax;
  margin-left: auto;
  color: #fff;
  background-color: #89c7aa;
  border-radius: 0.5vmax;
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 10%;
  margin-top: 1vmax;
  display: flex;
  justify-content: space-between;
`;

const RemoveBtn = styled.button`
  width: 10vmax;
  height: 3vmax;
  margin-right: auto;
  color: #fff;
  background-color: red;
  border-radius: 0.5vmax;
`;

const UpdateBtn = styled(RemoveBtn)`
  margin-right: 1vmax;
  background-color: #89c7aa;
`;

const CancelBtn = styled.button`
  width: 10vmax;
  height: 3vmax;
  border: 1px solid #000;
  border-radius: 0.5vmax;
`;

const ImgEditors = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 3;
`;

const ImgEditor = styled.div`
  width: 70%;
  height: 60%;
  padding: 3vmax;
  background-color: #fff;
  border-radius: 2vmax;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ImgButtonGroup = styled(ButtonGroup)`
  padding: 0;
  justify-content: flex-end;
`;

const Detail = () => {
  const { url } = useParams();
  const { loading, data } = useQuery(GET_DRAMA, {
    variables: { url },
  });
  const { data: dataAll } = useQuery(ALL_DRAMAS);
  const [removeDrama] = useMutation(REMOVE_DRAMA, {
    refetchQueries: [{ query: ALL_DRAMAS }],
  });

  const [updateDrama] = useMutation(UPDATE_DRAMA, {
    refetchQueries: [{ query: ALL_DRAMAS }],
  });

  const [dramaId, setDramaId] = useState('');
  const [title, setTitle] = useState('');
  const [dramaUrl, setDramaUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [cover, setCover] = useState('');
  const [youtube, setYoutube] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
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

  const [editDrama, setEditDrama] = useState(false);
  const [changeImage, setChangeImage] = useState(false);

  const changeTitle = useTitle();
  const history = useHistory();

  const checkUrl = async () => {
    const allUrl = await dataAll?.allDramas?.map((v) => v.url);
    if (!allUrl.includes(url)) {
      history.replace('/');
    }
  };

  useEffect(() => {
    checkUrl();

    changeTitle(data?.getDramaByUrl?.title);
    setDramaId(data?.getDramaByUrl?._id);
    setTitle(data?.getDramaByUrl?.title);
    setDramaUrl(data?.getDramaByUrl?.url);
    setSummary(data?.getDramaByUrl?.summary);
    setCover(data?.getDramaByUrl?.cover);
    setYoutube(data?.getDramaByUrl?.youtube);
    setImage1(data?.getDramaByUrl?.image1);
    setImage2(data?.getDramaByUrl?.image2);
    setImage3(data?.getDramaByUrl?.image3);
    setImg1_title(data?.getDramaByUrl?.img1_title);
    setImg2_title(data?.getDramaByUrl?.img2_title);
    setImg3_title(data?.getDramaByUrl?.img3_title);
    setVideo1(data?.getDramaByUrl?.video1);
    setVideo2(data?.getDramaByUrl?.video2);
    setVideo3(data?.getDramaByUrl?.video3);
  }, [data]);

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    if (id === 'title') {
      setTitle(value);
    } else if (id === 'dramaUrl') {
      setDramaUrl(value);
    } else if (id === 'summary') {
      setSummary(value);
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
    } else if (id === 'cover') {
      setCover(value);
    } else if (id === 'image1') {
      setImage1(value);
    } else if (id === 'image2') {
      setImage2(value);
    } else if (id === 'image3') {
      setImage3(value);
    } else if (id === 'youtube') {
      setYoutube(value);
    }
  };

  const onClickBack = () => {
    history.push('/');
  };

  const onClickRemove = () => {
    removeDrama({ variables: { _id: dramaId } });
    history.push('/');
  };

  const onSubmitUpdate = async (event) => {
    event.preventDefault();

    await updateDrama({
      variables: {
        _id: dramaId,
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

    setEditDrama((prev) => !prev);
  };

  const onClickEdit = (event) => {
    event.preventDefault();
    setEditDrama((prev) => !prev);
  };

  const onChangeImage = (event) => {
    event.preventDefault();
    setChangeImage((prev) => !prev);
  };

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

  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + month + day;
  };

  const onClickImageChange = async (event) => {
    event.preventDefault();
    if (coverFile !== '') {
      const coverRef = storage.ref().child(`${url}/changed/${getDate()}/cover`);
      await coverRef.put(coverFile);
      const coverURL = await coverRef.getDownloadURL();
      setCover(coverURL);
    }
    if (image1File !== '') {
      const image1Ref = storage
        .ref()
        .child(`${url}/changed/${getDate()}/image1`);
      await image1Ref.put(image1File);
      const image1URL = await image1Ref.getDownloadURL();
      setImage1(image1URL);
    }
    if (image2File !== '') {
      const image2Ref = storage
        .ref()
        .child(`${url}/changed/${getDate()}/image2`);
      await image2Ref.put(image2File);
      const image2URL = await image2Ref.getDownloadURL();
      setImage2(image2URL);
    }
    if (image3File !== '') {
      const image3Ref = storage
        .ref()
        .child(`${url}/changed/${getDate()}/image3`);
      await image3Ref.put(image3File);
      const image3URL = await image3Ref.getDownloadURL();
      setImage3(image3URL);
    }
    setChangeImage((prev) => !prev);
  };

  return (
    <Background>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Wrapper>
          <Covers>
            <Cover cover={data?.getDramaByUrl?.cover}></Cover>
          </Covers>
          <Description>
            <EditBtn src={EditImg} onClick={onClickEdit}></EditBtn>
            <GoBack onClick={onClickBack}>뒤로가기</GoBack>
            <Header>
              <Title>{data?.getDramaByUrl?.title}</Title>
              <Summary>{data?.getDramaByUrl?.summary}</Summary>
            </Header>
            <Videos>
              <Subtitles>
                <Subtitle>영상보기</Subtitle>
                <Link href={data?.getDramaByUrl?.youtube} target="_blank">
                  <SeeAll>전체보기</SeeAll>
                </Link>
              </Subtitles>
              <Links>
                <Link href={data?.getDramaByUrl?.video1} target="_blank">
                  <Image image={data?.getDramaByUrl?.image1}></Image>
                  <ListTitle>{data?.getDramaByUrl?.img1_title}</ListTitle>
                </Link>
                <Link href={data?.getDramaByUrl?.video2} target="_blank">
                  <Image image={data?.getDramaByUrl?.image2}></Image>
                  <ListTitle>{data?.getDramaByUrl?.img2_title}</ListTitle>
                </Link>
                <Link href={data?.getDramaByUrl?.video3} target="_blank">
                  <Image image={data?.getDramaByUrl?.image3}></Image>
                  <ListTitle>{data?.getDramaByUrl?.img3_title}</ListTitle>
                </Link>
              </Links>
            </Videos>
          </Description>
          {editDrama && (
            <EditModal>
              <Editor>
                <Form onSubmit={onSubmitUpdate} autocomplete="off">
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
                  <ReadOnly
                    id="image1"
                    type="text"
                    value={image1}
                    onChange={onChangeInput}
                    readOnly
                  />
                  <ReadOnly
                    id="image2"
                    type="text"
                    value={image2}
                    onChange={onChangeInput}
                    readOnly
                  />
                  <ReadOnly
                    id="image3"
                    type="text"
                    value={image3}
                    onChange={onChangeInput}
                    readOnly
                  />
                  <ReadOnly
                    id="cover"
                    type="text"
                    value={cover}
                    onChange={onChangeInput}
                    readOnly
                  />
                  <UpdateImage onClick={onChangeImage}>이미지 수정</UpdateImage>
                </Form>
                {changeImage && (
                  <ImgEditors>
                    <ImgEditor>
                      <Form onSubmit={onClickImageChange}>
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
                      <ImgButtonGroup>
                        <UpdateBtn onClick={onClickImageChange}>
                          수정하기
                        </UpdateBtn>
                        <CancelBtn onClick={onChangeImage}>취소하기</CancelBtn>
                      </ImgButtonGroup>
                    </ImgEditor>
                  </ImgEditors>
                )}
              </Editor>
              <ButtonGroup>
                <RemoveBtn onClick={onClickRemove}>삭제하기</RemoveBtn>
                <UpdateBtn onClick={onSubmitUpdate}>수정하기</UpdateBtn>
                <CancelBtn onClick={onClickEdit}>취소하기</CancelBtn>
              </ButtonGroup>
            </EditModal>
          )}
        </Wrapper>
      )}
    </Background>
  );
};

export default Detail;
