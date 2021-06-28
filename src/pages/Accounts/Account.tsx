import keyring from '@polkadot/ui-keyring';
import { Tooltip, Button } from 'antd';
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AccountInfo } from '../../core';
import { Style } from '../../shared/styled';
import MnemonicSvg from '../../assets/imgs/mnemonic.svg';
import DeleteSvg from '../../assets/imgs/delete.svg';

const Account: FC<{
  account: AccountInfo;
  className?: string;
}> = ({ account, className }): ReactElement => {

  const onDelete = () => {
    keyring.forgetAccount(account.address);
  }

  return (
    <div className={className}>
      <div className="name">{account.name}</div>
      <div className="address">
        <Link to={`/explorer/eoa/${account.address}`}>
          {account.address}
        </Link>
      </div>
      {
        !account.isTesting &&
          <div className="operation">
            <Tooltip title={account.mnemonic}>
              <div className="mnemonic">
                <img src={MnemonicSvg} alt="" />
                <span>Show Mnemonic</span>
              </div>
            </Tooltip>
            <Button onClick={onDelete}>
              <img src={DeleteSvg} alt="" />
              <span style={{ color: Style.color.icon.fail }}>
                Delete
              </span>
            </Button>
          </div>
      }
    </div>
  );
};

export default React.memo(styled(Account)`
  display: flex;
  background-color: white;
  height: 48px;
  line-height: 48px;
  margin-bottom: 10px;
  color: ${Style.color.label.primary};
  padding: 0px 20px;

  &:hover {
    background-color: ${Style.color.bg.default};
  }
  &:last-child {
    margin-bottom: 0px;
  }

  > .name {
    width: 10%;
    font-weight: 600;
  }
  > .address {
    width: 50%;
  }
  > .balance {
    width: 15%;
    font-weight: 600;
  }
  > .operation {
    justify-content: flex-end;
    display: flex;
    align-items: center;
    width: 25%;

    .mnemonic {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;

      > img {
        width: 15px;
        height: 15px;
      }
      > span {
        margin-left: 8px;
        font-weight: 600;
        color: ${Style.color.primary};
      }
    }
  }
`);