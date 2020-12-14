import React from 'react'
import { Button } from 'antd'

const KeywordSelector = ({ keywords, onSelect }) => {
  // const handleSelect = (value) = () => onSelect(value)

  return keywords.map(keyword => <Keyword keyword={keyword} key={keyword} onClick={() => onSelect(keyword)} />)
}

const Keyword = ({ keyword, onClick }) => (
  <Button type="text" onClick={onClick} >{keyword}</Button>
)



export default KeywordSelector