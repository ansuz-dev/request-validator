const path = require("path");
const express = require("express");

const app = express();
const {validator, convertor} = require("../index");

const port = 3000;

validator.init({
  schemas: path.join(__dirname, "schemas")
});

const router = express.Router();

router.get("/param/:id", [
  convertor.param([
    ["id", "number"]
  ]),
  validator.validator("/api/get/param"),
  (req, res) => {
    res.json({ message: `get param id=[${req.params.id}]` });
  }
]);

router.post("/param/:id", [
  convertor.param([
    ["id", "number"]
  ]),
  validator.validator("/api/post/param"),
  (req, res) => {
    res.json({ message: `post param id=[${req.params.id}]` });
  }
]);

router.get("/query", [
  convertor.query([
    ["ids", "array"]
  ]),
  validator.validator("/api/get/query"),
  (req, res, next) => {
    res.json({ message: `get query` });
  }
]);

// always invoked
router.use(async (req, res) => {
  console.log("%s %s DONE", req.method, req.path);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", router);
app.use("/async/", require("./async_router")._);

app.use((error, req, res, next) => {
  console.log(error);

  res.status(500).json({ message: error.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
