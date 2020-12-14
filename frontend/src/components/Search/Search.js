import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';

import useDebounce from '../../utils/useDebounce';
import { suggest } from '../../api';
import './Search.css';
const { Option } = AutoComplete;

const Search = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [options, setOptions] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      suggest(debouncedSearchTerm).then((results) => {
        console.log('results', results);
        setIsSearching(false);
        setOptions(results);
      });
    } else {
      setOptions([]);
    }
  }, [debouncedSearchTerm, onResults]);

  const onChange = (value) => setSearchTerm(value);
  const onSelect = ([make, model]) => onResults({ make, model });
  // const onChange = value => setSearchTerm(value);

  return (
    <AutoComplete
      className='search-bar__wrapper'
      onSelect={onSelect}
      onSearch={onChange}
      placeholder='search'
      disabled={isSearching}
    >
      {options.map(([make, model], index) => (
        <Option key={index} value={[make, model]}>
          {make} {model}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default Search;
