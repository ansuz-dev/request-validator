const { Router } = require("@ansuz-dev/async-router");
const {validator, convertor} = require("../index");

const router = new Router();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

router.get("/query", [
  convertor.queryAsync([
    ["ids", "array"]
  ]),
  validator.validatorAsync("/api/get/query"),
  async (req, res) => {
    await sleep(100);
    res.json({ message: `get async query` });
  }
]);

module.exports = router;
