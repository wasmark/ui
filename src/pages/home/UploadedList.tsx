import { FC, ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { UploadedContractsContext } from '../../core';
import CodeDisplay from './Code';

const Wrapper = styled.ul`
  width: 700px;
  padding: 1px solid gray;

`;

const UploadedList: FC = (): ReactElement | null => {
  const { codes } = useContext(UploadedContractsContext);

  return (
    <Wrapper>
      {
        codes.map((code, index) =>
          <CodeDisplay code={code} key={index} />
        )
      }
    </Wrapper>
  );
};

export default UploadedList;