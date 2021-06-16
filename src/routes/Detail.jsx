import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// firebase
import { storage } from '../fbase';

//styles
import styled from 'styled-components';
import { size, color, screen } from '../styles/SharedStyle';
import device from '../styles/MediaQuery';

// apollo
import { useQuery, useMutation } from '@apollo/client';
import {
  REMOVE_DRAMA,
  UPDATE_DRAMA,
  GET_DRAMA,
  ALL_DRAMAS,
} from '../apollo/gql';

// components
import Editor from '../components/Editor';
import { Button } from '../components/Shared/ButtonSet';

// assets
import Loading from '../components/Shared/Loading';
import EditImg from '../assets/edit.png';

// hooks
import useTitle from '../hooks/useTitle';

// utils
import getDate from '../utils/getDate';

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

  const [dramaData, setDramaData] = useState({
    title: '',
    dramaId: '',
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

  const [editDrama, setEditDrama] = useState(false);

  const changeTitle = useTitle();
  const history = useHistory();

  const {
    dramaId,
    title,
    dramaUrl,
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
  } = dramaData;

  const { cover_file, img1_file, img2_file, img3_file } = files;
  const { cover_preview, img1_preview, img2_preview, img3_preview } = preview;

  // const checkUrl = async () => {
  //   const allUrl = await dataAll?.allDramas?.map((item) => item.url);
  //   if (!allUrl.includes(url)) {
  //     history.replace('/');
  //   }
  // };

  useEffect(() => {
    const getDrama = data?.getDramaByUrl;

    // checkUrl();
    changeTitle(getDrama?.title);
    setDramaData({
      dramaId: getDrama?._id,
      title: getDrama?.title,
      dramaUrl: getDrama?.url,
      summary: getDrama?.summary,
      cover: getDrama?.cover,
      youtube: getDrama?.youtube,
      image1: getDrama?.image1,
      image2: getDrama?.image2,
      image3: getDrama?.image3,
      img1_title: getDrama?.img1_title,
      img2_title: getDrama?.img2_title,
      img3_title: getDrama?.img3_title,
      video1: getDrama?.video1,
      video2: getDrama?.video2,
      video3: getDrama?.video3,
    });
    setPreview({
      cover_preview: getDrama?.cover,
      img1_preview: getDrama?.image1,
      img2_preview: getDrama?.image2,
      img3_preview: getDrama?.image3,
    });
  }, [data]);

  // when editor opened prevent background scroll.
  useEffect(() => {
    editDrama && (document.body.style.overflow = 'hidden');
    !editDrama && (document.body.style.overflow = 'auto');
  }, [editDrama]);

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
    } else if (id === 'cover') {
      setDramaData({ ...dramaData, cover: value });
    } else if (id === 'image1') {
      setDramaData({ ...dramaData, image1: value });
    } else if (id === 'image2') {
      setDramaData({ ...dramaData, image2: value });
    } else if (id === 'image3') {
      setDramaData({ ...dramaData, image3: value });
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

  const onSubmitUpdate = async (event) => {
    event.preventDefault();

    if (cover_file !== '') {
      const cover_ref = storage
        .ref()
        .child(`${dramaUrl}/changed/${getDate()}/cover`);
      await cover_ref.put(cover_file);
      const cover_url = await cover_ref.getDownloadURL();
      setDramaData({ ...dramaData, cover: cover_url });
    }
    if (img1_file !== '') {
      const img1_ref = storage
        .ref()
        .child(`${dramaUrl}/changed/${getDate()}/image1`);
      await img1_ref.put(img1_file);
      const img1_url = await img1_ref.getDownloadURL();
      setDramaData({ ...dramaData, image1: img1_url });
    }
    if (img2_file !== '') {
      const img2_ref = storage
        .ref()
        .child(`${dramaUrl}/changed/${getDate()}/image2`);
      await img2_ref.put(img2_file);
      const img2_url = await img2_ref.getDownloadURL();
      setDramaData({ ...dramaData, image2: img2_url });
    }
    if (img3_file !== '') {
      const img3_ref = storage
        .ref()
        .child(`${dramaUrl}/changed/${getDate()}/image3`);
      await img3_ref.put(img3_file);
      const img3_url = await img3_ref.getDownloadURL();
      setDramaData({ ...dramaData, image3: img3_url });
    }

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

  const onClickBack = () => {
    history.push('/');
  };

  const onClickRemove = () => {
    const confirm = window.confirm(`${title} 을/를 삭제하시겠습니까?`);
    if (confirm) {
      removeDrama({ variables: { _id: dramaId } });
      history.push('/');
    }
  };

  // editor open and close
  const onClickEdit = (event) => {
    event.preventDefault();
    setEditDrama((prev) => !prev);
  };

  if (loading) return <Loading />;

  return (
    <Background>
      <Wrapper>
        <Nav>
          <GoBack onClick={onClickBack}>뒤로가기</GoBack>
          <EditBtn src={EditImg} onClick={onClickEdit}></EditBtn>
        </Nav>
        <Group>
          <Covers>
            <Cover cover={cover}></Cover>
          </Covers>
          <Header>
            <Title>{title}</Title>
            <Summary>{summary}</Summary>
          </Header>
        </Group>
        <Videos>
          <Subtitles>
            <Subtitle>영상보기</Subtitle>
            <Link href={youtube} target="_blank">
              <SeeAll>전체보기</SeeAll>
            </Link>
          </Subtitles>
          <Links>
            <Link href={video1} target="_blank">
              <Image image={image1}></Image>
              <ListTitle>{img1_title}</ListTitle>
            </Link>
            <Link href={video2} target="_blank">
              <Image image={image2}></Image>
              <ListTitle>{img2_title}</ListTitle>
            </Link>
            <Link href={video3} target="_blank">
              <Image image={image3}></Image>
              <ListTitle>{img3_title}</ListTitle>
            </Link>
          </Links>
        </Videos>

        {editDrama && (
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
              textColor="#fff"
              backgroundColor="#e03131"
              onClick={onClickRemove}
              text="삭제하기"
              style={{ marginRight: 'auto' }}
            />
            <Button
              textColor="#e03131"
              backgroundColor="transparent"
              onClick={onClickEdit}
              text="취소"
              style={{ border: '1px solid #e03131' }}
            />
            <Button
              textColor="#fff"
              backgroundColor="#8bc7ab"
              onClick={onSubmitUpdate}
              text="확인"
            />
          </Editor>
        )}
      </Wrapper>
    </Background>
  );
};

const Background = styled.main`
  width: 100vw;
  min-height: 100vh;

  background-color: ${color.gray};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.article`
  width: 100%;
  max-width: ${screen.mobile};
  height: 100%;

  padding: ${size.medium};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${device.desktop`
    max-width: ${screen.desktop};
  `}
`;

const Nav = styled.nav`
  width: 100%;
  padding-bottom: ${size.tiny};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${device.tablet`
    padding-bottom: ${size.small};
  `}

  ${device.desktop`
    padding-bottom: ${size.large};
  `}
`;

const GoBack = styled.div`
  color: #fff;

  font-size: ${size.tiny};
  cursor: pointer;

  ${device.tablet`
    font-size: ${size.medium};
  `}
`;

const EditBtn = styled.img`
  width: ${size.medium};
  height: ${size.medium};

  cursor: pointer;

  ${device.tablet`
    width: calc(2 * ${size.base});
    height: calc(2 * ${size.base});
  `}
`;

const Group = styled.section`
  width: 100%;

  ${device.desktop`
    display: flex;
    justify-content: space-between;
    gap: ${size.large};
  `}
`;

const Covers = styled.div`
  width: 100%;
  height: 65vh;

  margin-bottom: ${size.large};

  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);

  ${device.tablet`
    height: 70vh;
  `}

  ${device.desktop`
    width: 45%;
    height: 45vh;
  `}
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.cover});
  background-size: cover;
  background-position: top center;

  border-radius: 10px;
`;

const Header = styled.div`
  width: 100%;
  height: 40%;

  margin-top: ${size.medium};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${size.tiny};

  ${device.desktop`
    gap: ${size.large};
  `}
`;

const Title = styled.h1`
  color: #fff;
  font-size: ${size.medium};

  ${device.tablet`
    font-size: ${size.large};
  `}
`;

const Summary = styled.p`
  color: #fff;

  font-size: ${size.tiny};
  text-align: justify;
  line-height: 1.3;

  ${device.tablet`
    font-size: ${size.medium};
  `}

  ${device.desktop`
    line-height: 1.75;
  `}
`;

const Videos = styled.div`
  width: 100%;
  height: 100%;

  margin-top: ${size.large};

  display: flex;
  flex-direction: column;
  justify: space-between;

  gap: ${size.tiny};
`;

const Subtitles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Subtitle = styled.h3`
  color: #fff;
  font-size: ${size.base};

  ${device.tablet`
    font-size: ${size.medium};
  `}
`;

const SeeAll = styled.div`
  color: #fff;
  font-size: ${size.tiny};

  ${device.tablet`
    font-size: ${size.base};
  `}
`;

const Links = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const Link = styled.a`
  display: block;
`;

const Image = styled.div`
  width: 28vmin;
  max-width: calc(${screen.mobile} / 3 - ${size.small});
  height: calc(28vmin * 0.6);
  max-height: calc((${screen.mobile} / 3 - ${size.small}) * 0.6);
  margin-bottom: ${size.tiny};

  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;

  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);
  border-radius: 6px;

  &:hover {
    transform: scale(1.02);
  }

  ${device.desktop`
    width: calc(${screen.desktop} / 3 - ${size.large});
    max-width: calc(${screen.desktop} / 3 - ${size.large});

    height: calc((${screen.desktop}/ 3 - ${size.large}) * 0.6);
    max-height: calc((${screen.desktop} / 3 - ${size.large}) * 0.6);
  `}
`;

const ListTitle = styled.div`
  width: 28vmin;
  max-width: calc(${screen.mobile} / 3 - ${size.small});
  color: #fff;

  font-size: ${size.tiny};
  text-align: center;

  ${device.tablet`
    font-size: ${size.base};
  `}

  ${device.desktop`
    width: calc(${screen.desktop} / 3 - ${size.large});
    max-width: calc(${screen.desktop} / 3 - ${size.large});
  `}
`;

export default Detail;
