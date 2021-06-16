import React from 'react';

// styles
import styled from 'styled-components';
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
  gap: 10px;

  ${device.desktop`
    max-width: 768px;
    height: fit-content;
    justify-content: flex-start;
  `}
`;

const Tabs = styled.header`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap 1px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  ${device.desktop`
    max-width: 768px;

  `}
`;

const Tab = styled.button`
  padding: 10px;

  font-size: 12px;
  border-radius: 5px 5px 0 0;
  &:focus {
    color: #fff;
    font-weight: 600;
    background-color: #8bc7ab;
  }
`;

const Body = styled.section`
  width: 100%;
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;

  ${device.desktop`
    max-width: 768px;

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `}
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;

  margin-top: auto;

  ${device.desktop`
    max-width: 768px;

  `}
`;

export default Editor;
