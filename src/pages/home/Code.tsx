import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { FC, ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { Code } from '../../core';
import MoreSvg from '../../assets/imgs/more.svg';
import { Style } from '../../shared/styled';

const CodeDisplay: FC<{ className: string; code: Code }> = ({ className, code }): ReactElement => {
  const [ expanded, setExpanded ] = useState(false);

  return (
    <div className={className}>
      <div className="title" onClick={() => setExpanded(!expanded)}>
        <span>{code.name}-</span>
        <div className="toggle">
          <span>
            Messages
          </span>
          <img src={MoreSvg} alt="" style={{ transform: expanded ? 'scaleY(-1)' : '' }} />
        </div>
      </div>
      {
        expanded &&
          <div className="message-list">
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
      }
    </div>
  );
};

export default React.memo(styled(CodeDisplay)`
  border-bottom: 1px solid ${Style.color.border.default};

  > .title {
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    color: ${Style.color.label.primary};
    
    > .toggle {
      user-select: none;
      display: flex;
      align-items: center;
  
      > span {
        color: ${Style.color.primary};
        margin-right: 4px;
      }
    }
  }

  .message-list {
    background: ${Style.color.bg.second};
    padding: 20px 21px;
  }
`);