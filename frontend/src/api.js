import Axios from 'axios'
export const INDEX = 'carscout';

export const BASE_URL = 'http://localhost:5000/api/'

export const api = Axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })

export const search = async (body) => {

  try {
    const { status, data } = await api.post('search',  body)
    
    if (status !== 200) {
      console.warn('[ELASTIC SEARCH]', status, data)
      return {}
    }

    return data

  } catch (e) {
    console.warn('[ELASTIC SEARCH]', e)
    throw e
  }

};

export const suggest = async (term) => {

  try {
    const { status, data } = await api.post('suggest',  { term })
    
    if (status !== 200) {
      console.warn('[ELASTIC SEARCH]', status, data)
      return {}
    }

    return data

  } catch (e) {
    console.warn('[ELASTIC SEARCH]', e)
    throw e
  }

};

window.search = search

export const aggregatedSearchWithFilter = async (filter, fields = []) => {
  const availableFileds = fields.filter(field => !filter[field])
  return await search({
    term: '',
    fields: availableFileds,
    filters: Object.entries(filter)
  })
}

export const aggregatedSearch = async (term, fields = []) => {
  return await search({
    term, 
    fields
  })
}

// const suggest = () => {};

// const aggBy = (fields = []) => {
//   const agg = {}
//   fields.forEach(field => {
//     agg[`${field}s`] = distinctPriceAggFor(field)
//   })

//   return agg
// };

// const distinctPriceAggFor = (field) => ({
//   terms: {
//     field,
//   },
//   aggs: {
//     average: {
//       avg: {
//         field: 'price',
//       },
//     },
//     minimal: {
//       min: {
//         field: 'price',
//       },
//     },
//     maximal: {
//       max: {
//         field: 'price',
//       },
//     },
//   },
// });

// const moreLikeThis = (params) => {}

export default api;
