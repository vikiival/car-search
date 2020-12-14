import React from 'react'
import NumericFilter from './NumericFilter'
import SelectFilter from './SelectFilter'

const router = {
  numeric: ['kms', 'firstRegistrations']
}

const eq = (name) => (el) => el === name


const ChartFilter = ({ name, field, onChange }) => {
  if (router.numeric.some(eq(name))) {
    return <NumericFilter name={name} field={field} onChange={onChange} />
  }

  return <SelectFilter name={name} field={field} onChange={onChange} />
}


export default ChartFilter