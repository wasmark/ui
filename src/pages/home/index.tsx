import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Endpoints from './Endpoints';

const Wrapper = styled.div``;

const Home: FC = (): ReactElement => {

  return (
    <Wrapper>
      <Endpoints />
    </Wrapper>
  );
};

export default Home;