import { Col, Row } from 'antd';
import { FC, ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { UploadedContractsContext } from '../../core';

const Wrapper = styled.ul`
  width: 700px;
  padding: 1px solid gray;

  > .code {

  }
`;

const UploadedList: FC = (): ReactElement | null => {
  const { codes } = useContext(UploadedContractsContext);

  return (
    <Wrapper>
      {
        codes.map((code, index) =>
          <div className="code" key={index}>
            <div>{code.name}</div>
            {
              code.abi.messages.map(message =>
                <div>
                  {message.identifier}
                  (
                    {
                      message.args.map((arg, index) =>
                        <span key={index}>
                          {!!index && ', '}{arg.name}: {arg.type.displayName}
                        </span>
                      )
                    }
                  ):
                  {' ' + message.returnType?.displayName}
                </div>
              )
            }
          </div>
        )
      }
    </Wrapper>
  );
};

export default UploadedList;