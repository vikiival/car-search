import React, { useEffect, useState, Fragment } from 'react'
import { Button, Slider } from 'antd'

const NumericFilter = ({ name, field, onChange }) => {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [value, setValue] = useState([1,1])

  useEffect(() => {
    if (field && field.length > 1)
    setMin(Number(field[0].name))
    setMax(Number(field[field.length - 1].name))
  }, [field])

  const handleClick = () => {
    if (value[0] !== value[1]) {
      onChange({
        [name.slice(0, -1)]: value
      })
    }
  }

  const handleChange = ([vMin, vMax]) => {
    if (vMin === vMax) {
      return
    }

    setValue([vMin, vMax])
  }



  return (
    <Fragment>
      <Slider defaultValue={value} min={min} max={max} range onChange={handleChange} />
      <Button onClick={handleClick} >Submit</Button>
    </Fragment>
  )
}

export default NumericFilter