from elasticsearch import Elasticsearch
es = Elasticsearch()
INDEX='carscout'

def search(body):
  res = es.search(index=INDEX, body=body)
  return res