import React from 'react'
import { Divider, Row, Col } from 'antd';

const Filter = ({ filter }) => {

  return (
    <div>
      <Divider orientation="left">Active Filters</Divider>
      { Object.entries(filter).map(filterMapper) }
    </div>
  )
}

const filterMapper = (filterValue, index) => <FilterValue key={index} filterValue={filterValue} />

const FilterValue = ({ filterValue }) => (
  <Row>
    <Col span={3}><b>{filterValue[0]}: </b></Col>
    <Col span={12}>{Array.isArray(filterValue[1]) ? filterValue[1].join(' - ') : filterValue[1]}</Col>
  </Row>
)

export default Filter