from helpers import check_and_extract, console_log

keys = ["average", "minimal", "maximal"]

def unwrap_agg(values):
    result = {}
    for val in values:
      year = {}
      year_key = check_and_extract(val, "key_as_string")
      if not year_key:
        year_key = check_and_extract(val, "key")
      for key in keys:
          year[key] = check_and_extract(val, key)
      result[year_key] = year
    return result


def map_agg(unwrapped_agg):
  key, value = unwrapped_agg
  return {
    "name": key,
    "average": value['average'],
    "minimal": value['minimal'],
    "maximal": value['maximal']
  }

def magic(items):
  res = []
  sort_fn = lambda x: x['name']
  for item in items:
    mapped = map_agg(item)
    console_log(mapped)
    res.append(mapped)
  return sorted(res, key=sort_fn)



def unwrap_agg_res(res):
  values = res['aggregations']
  agg_keys = values.keys()
  fn = lambda x: unwrap_agg(values[x]['buckets'])
  map_fn = lambda x: x.items()
  
  return list(zip(agg_keys, map(magic,map(map_fn, map(fn, agg_keys)))))

def unwrap_suggest(res):
  options = res['suggest']['search_suggest'][0]['options']
  return list(map(map_suggest, options))

def map_suggest(object):
  return object['_source']['suggest']
