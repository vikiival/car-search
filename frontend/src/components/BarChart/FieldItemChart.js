import React from 'react'
import { Typography, Divider } from 'antd';
import BarChart from './ReBarChart'
import ChartFilter from './ChartFilter'

const { Title } = Typography;


const FieldItemChart = ({ name, field, onChange }) => {
  return (
    <div>
      <Divider orientation="center"><Title level={4}>{name}</Title></Divider>
      <ChartFilter name={name} field={field} onChange={onChange} />
      <BarChart data={field} />
    </div>
  )
}

export const fieldMapper = (onChange) => ([name, field], index) => <FieldItemChart name={name} field={field} key={index} onChange={onChange} />

export default FieldItemChart