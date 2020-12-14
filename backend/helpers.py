import pprint
pp = pprint.PrettyPrinter(indent=2)

def extract(key):
    return lambda x: check_and_extract(x, key)

def check_and_extract(value, key):
    if key in value:
        if type(value[key]) is dict:
            return value[key]['value']
        else: 
            return value[key]
    return 0

def distinct_price_agg_for(field):
    return {
      "terms": {
        "field": field
      },
      "aggs": plain_price_agg()
    }

def plain_price_agg():
  return {
        "average": {
          "avg": {
            "field": "price"
          }
        },
        "minimal" : {
         "min": {
           "field": "price"
         } 
        },
        "maximal": {
          "max": {
            "field": "price"
          }
        }
      }

def price_aggegation(fields):
  if len(fields) == 0:
    return plain_price_agg()
  agg = {}
  for field in fields:
      agg[field + 's'] = distinct_price_agg_for(field)
  return agg

def ranges_and_filters(pairs):
  ranges = []
  filters = []
  for pair in pairs:
    if isinstance(pair[1], list):
      ranges.append(pair)
    else:
      filters.append(pair)
  
  return ranges, filters

def lambda_router(pair):
  term_fn = lambda x: { "term": { x[0]: x[1] } }
  range_fn = lambda x: { "range": { x[0]: { "gte": x[1][0], "lte": x[1][1] } } }
  if isinstance(pair[1], list):
    return range_fn(pair)
  return term_fn(pair)

def bool_filter(filters):
  bool = {}
  bool["must"] = list(map(lambda_router, filters))
  return None if len(bool["must"]) == 0 else bool

def search_builder(term, aggs, filters, size = 20):
  q = {
    "size": size,
    "query": {}
  }

  if aggs: 
    q['aggs'] = aggs

  if filters:
    q['query']['bool'] = filters

  if term: 
    q['query']['match'] = { "content": term }
  
  console_log(q)
  return q


def aggregated_serch(term, fields, filters):
  return search_builder(term, price_aggegation(fields), bool_filter(filters), 0)

def console_log(stuff):
  pp.pprint(stuff)
  