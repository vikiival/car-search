import React, { useState, useEffect } from 'react';
import Search from './components/Search/Search';
import { fieldMapper } from './components/BarChart/FieldItemChart'
import BarChart from './components/BarChart/ReBarChart'
import Filter from './components/Filter/Filter'
import Result from './components/Result/Result'
import { aggregatedSearchWithFilter } from './api'
import { notification, Typography } from 'antd'
import './App.css';

const { Title } = Typography

const App = () => {
  const [fields, setFields] = useState([]);
  const [filter, setFilter] = useState({});
  const [result, setResult] = useState([]);

  useEffect(() => {
    // Call search :) with must match :)
    if (Object.keys(filter).length > 0) {
      aggregatedSearchWithFilter(filter, ['firstRegistration', 'body', 'fuel', 'gearingType', 'km'])
      .then(value => {
        if (Array.isArray(value)) {
          setFields(value)
          setResult(null);
        } else {
          console.log("🚀 ~ file: App.js ~ line 26 ~ useEffect ~ value", value)
          const entries = Object.entries(value).map(([key, v]) => [key, v.value])
          setResult(entries)
          setFields([])
        }
      }, (e) => {
        notification.open({
          message: 'Search Error',
          description: e.message,
        });
        setFields([])
      })
    }
    console.log('UPDATE FILTER', filter)
  }, [filter])



  const updateFilter = (results) => {
    // Something then 
    console.log("🚀 ~ file: App.js ~ line 13 ~ handleResults ~ results", results)  
    setFilter(prevFilter => ({ ...prevFilter, ...results }))
    // setFields(results)
  }
  

  return (
    <div className='app-wrapper' >
      <Title level={2}>Search a car 🚙</Title>
      <Search onResults={updateFilter}/>
      <Filter filter={filter} />
      { fields.map(fieldMapper(updateFilter)) }
      <Result result={result} />
      <BarChart />
    </div>
  );
};

export default App;
