import React from 'react';

// styles
import styled from 'styled-components';
import { size, color, screen } from '../styles/SharedStyle';
import device from '../styles/MediaQuery';

// components
import { EditorSet } from './Shared/EditorSet';
import { TabContent } from './Shared/TabContent';

// hooks
import useTabs from '../hooks/useTabs';

const Editor = ({
  onSubmit,
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
  children,
}) => {
  const contents = TabContent({
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
  });

  const { currentItem, changeItem } = useTabs(0, contents);

  return (
    <EditorSet onSubmit={onSubmit}>
      <TabWrapper>
        <Tabs>
          {contents.map((item, idx) => (
            <Tab
              key={item.tab}
              onClick={(event) => {
                event.preventDefault();
                changeItem(idx);
              }}>
              {item.tab}
            </Tab>
          ))}
        </Tabs>
        <Body>{currentItem.content}</Body>
      </TabWrapper>
      <ButtonGroup>{children}</ButtonGroup>
    </EditorSet>
  );
};

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${size.tiny};

  ${device.desktop`
    max-width: ${screen.tablet};
    height: fit-content;
    justify-content: flex-start;
  `}
`;

const Tabs = styled.header`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  ${device.desktop`
    max-width: ${screen.tablet};

  `}
`;

const Tab = styled.button`
  padding: 10px;

  font-size: ${size.tiny};
  border-radius: 5px 5px 0 0;
  &:focus {
    color: #fff;
    font-weight: 600;
    background-color: ${color.green};
  }
`;

const Body = styled.section`
  width: 100%;
  padding-top: ${size.medium};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${size.large};

  ${device.desktop`
    max-width: ${screen.tablet};

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `}
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${size.tiny};

  margin-top: auto;

  ${device.desktop`
    max-width: ${screen.tablet};

  `}
`;

export default Editor;
