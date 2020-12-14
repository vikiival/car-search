import React, { useEffect, useState } from 'react'
import { Button } from 'antd'


const SelectFilter = ({ name, field, onChange }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (field && field.length) {
      setOptions(field.map(f => f.name))
    }
  }, [field])

  const handleChange = (value) => () => onChange({
    [name.slice(0, -1)]: value
  })

  return options.map((value) => <Button key={value} onClick={handleChange(value)}>{value}</Button> )

}

export default SelectFilter