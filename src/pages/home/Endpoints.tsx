import { FC, ReactElement, useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Col, Input, Row } from 'antd';
import { DeleteOutlined, PlusOutlined, LinkOutlined, DisconnectOutlined } from '@ant-design/icons';
import { EndpointsContext } from '../../core';

const Wrapper = styled.div`
  width: 400px;
`;
const List = styled.ul``;

const Endpoints: FC = (): ReactElement => {
  const { endpoints, add, remove, toggleChecked } = useContext(EndpointsContext);
  const [ endpoint, setEndpoint ] = useState<string>('');

  console.log('render end');
  return (
    <Wrapper>
      <Row style={{ margin: '0 auto', height: '40px'}}>
        <Col span={20} style={{ paddingRight: '20px' }} >
          <Input style={{ width: '100%', height: '100%' }} onChange={e => setEndpoint(e.target.value)} />
        </Col>
        <Col span={4}>
          <Button style={{ height: '100%' }} type="dashed" icon={<PlusOutlined />} onClick={() => add(endpoint)} />
        </Col>
      </Row>

      <List>
        {
          endpoints.map((endpoint, index) =>
            <Row key={index} style={{ padding: '0px 11px', margin: '10px 0px' }}>
              <Col span={15}>{ endpoint.domain }</Col>
              <Col span={3}>{
                endpoint.connected ?
                  <LinkOutlined /> :
                  <DisconnectOutlined />
              }</Col>
              <Col span={3}>{
                <Checkbox onChange={() => toggleChecked(index)} checked={endpoint.enabled} />
              }</Col>
              <Col span={3}>{
                <DeleteOutlined onClick={() => remove(index)} />
              }</Col>
            </Row>
          )
        }
      </List>
    </Wrapper>
  );
};

export default Endpoints;