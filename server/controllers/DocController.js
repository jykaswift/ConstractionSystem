const ApiError = require("../error/ApiError");
const axios = require("axios");

class DocController {
  async getDocsBySearch(req, res, next) {
    const { query, page } = req.query;

    if (!page || !query) {
      return next(ApiError.badRequest("No query or page"));
    }

    const queryData = {
      _source: "doc_name",
      from: page * 10,
      size: 10,
      query: {
        match: {
          doc_html: query,
        },
      },
    };

    axios
      .post(
        `http://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/_search`,
        queryData, {
          auth: {
            username: process.env.ELASTIC_USER,
            password: process.env.ELASTIC_PASSWORD
          }
        }
      )
      .then((elastic_res) => {
        const total = elastic_res.data.hits.total.value;
        const totalPage = Math.floor(total / 10);
        const result = [];
        elastic_res.data.hits.hits.forEach((obj) => {
          result.push({
            id: obj._id,
            doc_name: obj._source.doc_name,
          });
        });
        res.set("total-docs", total);
        res.set("total-page", totalPage);
        res.set("Access-Control-Expose-Headers", "total-page, total-docs");
        res.json(result);
      })
      .catch((e) => {
        console.log(e)
        next(e)
      });
  }

  async getDocById(req, res, next) {
    const { id } = req.query;

    if (!id) {
      return next(ApiError.badRequest("No id argument"));
    }

    axios
      .get(
        `http://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/html_data/_source/${id}`,
        {
          auth: {
            username: process.env.ELASTIC_USER,
            password: process.env.ELASTIC_PASSWORD
          }
        }
      )
      .then((elastic_res) => {
        res.json(elastic_res.data);
      })
      .catch((e) => {
        console.log(e);
        next(e);
      });
  }

  async saveDoc(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }
}

module.exports = new DocController();
