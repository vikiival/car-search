import React, { Fragment } from 'react';
import { Row, Col, Typography, Divider, Button } from 'antd';
import './Result.css'

const { Title } = Typography

const Result = ({ result }) => {
  if (!result || !result.length) {
    return null;
  }

  return (
    <Fragment>
      <Divider orientation="left">Results</Divider>
      <Row justify="center" className='result-wrapper' >
        {result.map(([key, value]) => (
          <Col span={8} key={key} className='result-row__center'>
          <Title level={2}>{key}</Title>
          <Title className='result-value' level={4}>{value}</Title>
        </Col>
        ))}
      </Row>
      <Button className='result-button__reset' danger block onClick={() => window.location.reload()}>
        Reload
      </Button>
    </Fragment>
  );
};


export default Result