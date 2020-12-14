from flask import Flask, request, jsonify
from flask_cors import CORS
from helpers import aggregated_serch, console_log
from elastic import search
from mappers import unwrap_agg_res, unwrap_suggest

app = Flask(__name__)
CORS(app)


@app.route("/api")
def hello():
    return {
        "username": "user.username",
        "theme": "user.theme",
        "image": "you dont need pic",
    }


@app.route("/api/search", methods=["POST"])
def api_search():
    fields = request.json["fields"]
    term = request.json["term"]
    filters = request.json["filters"]

    res = search(aggregated_serch(term, fields, filters))

    if len(fields) == 0:
      return jsonify(res['aggregations'])
    mapped = unwrap_agg_res(res)
    return jsonify(mapped)


@app.route("/api/suggest", methods=["POST"])
def api_suggest():
  term = request.json["term"]

  body = {
    "suggest": {
      "search_suggest": {
        "prefix": term,
        "completion": {"field": "suggest"},
      }
    }
  }

  res = search(body)

  mapped = unwrap_suggest(res)
  return jsonify(mapped)


if __name__ == "__main__":
    app.run(debug=True)
