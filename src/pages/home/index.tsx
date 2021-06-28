import { FC, ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import Endpoints from './Endpoints';
import Upload from './upload';
import UploadedList from './UploadedList';
import Accounts from '../Accounts';

const Wrapper = styled.div``;

const Home: FC = (): ReactElement => {
  const [ uploadVisible, setUploadVisible ] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setUploadVisible(false)
  }, [setUploadVisible]);

  return (
    <Wrapper>
      <Endpoints />
      <Button onClick={() => setUploadVisible(true)}>
        上传
      </Button>
      
      <Upload visible={uploadVisible} onClose={onClose} />
      <UploadedList />
      <Accounts />
    </Wrapper>
  );
};

export default Home;