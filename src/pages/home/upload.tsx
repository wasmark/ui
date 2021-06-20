import { FC, ReactElement, useCallback, useContext, useState } from 'react';
import { Button, Modal, Upload as UploadAntd } from 'antd';
import { Abi } from '@polkadot/api-contract';
import { hexToU8a, isHex, u8aToString } from '@polkadot/util';
import type { RcFile } from 'antd/lib/upload';
import styled from 'styled-components';
import { EndpointsContext, UploadedContractsContext } from '../../core';

const Wrapper = styled.div`
  width: 400px;
`;

const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);
const STR_NL = '\n';

interface CodeJson {
  abi?: string | null;
  codeHash: string;
  name: string;
  tags: string[];
  whenCreated: number;
}

function convertResult (result: ArrayBuffer): Uint8Array {
  const data = new Uint8Array(result);

  // this converts the input (if detected as hex), via the hex conversion route
  if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
    let hex = u8aToString(data);

    while (hex[hex.length - 1] === STR_NL) {
      hex = hex.substr(0, hex.length - 1);
    }

    if (isHex(hex)) {
      return hexToU8a(hex);
    }
  }

  return data;
}

const Upload: FC<{ visible: boolean, onClose: () => void }> = ({ visible, onClose }): ReactElement | null => {
  const { save } = useContext(UploadedContractsContext);
  const [ abi, setAbi ] = useState<Abi>();
  const [ code, setCode ] = useState<CodeJson>();

  const beforeUpload = useCallback(async (file: RcFile) => {
    try {
      const data = await file.arrayBuffer();
      const json = u8aToString(convertResult(data));
      const abi = new Abi(json);
      setAbi(abi);
      setCode({
        abi: json,
        codeHash: '',
        name: file.name,
        tags: [],
        whenCreated: 0,
      });
    } catch (error) {
      console.error(error);

      setAbi(undefined);
      setCode(undefined);
    }

    return false;
  }, [setCode, setAbi]);

  console.log('render end');
  return !visible ? null : (
    <Modal
      onCancel={onClose}
      visible={true}
      footer={
        <Button
          disabled={!abi || !code}
          onClick={
            () => {
              save({
                abi: abi!,
                name: code!.name
              });
              onClose();
            }
          }
        >Ok</Button>
      }
    >
      <UploadAntd beforeUpload={beforeUpload}>
        <Button>Upload</Button>
      </UploadAntd>
    </Modal>
  );
};

export default Upload;