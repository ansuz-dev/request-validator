"use strict";
const fs = require("fs");
const path = require("path");

const Ajv = require("ajv");
let ajv = null;

const preDefs = path.join(__dirname, "defs");

let _config = {
  schemas: "",
};

function _loadFromFile(filePath) {
  let schema = require(filePath);
  ajv.addSchema(schema);
}

function _loadFromDir(dirPath) {
  if (!dirPath) return;

  let files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile()) {
      let filePath = path.join(dirPath, file.name);
      _loadFromFile(filePath);
    } else if (file.isDirectory()) {
      let subdirPath = path.join(dirPath, file.name);
      _loadFromDir(subdirPath);
    }
  });
}

function _loadSchemas() {
  // load from pre-definitions directory
  _loadFromDir(preDefs);

  // load from schemas directory in config
  _loadFromDir(_config.schemas);
}

function init(config) {
  _config = { ..._config, ...config };
  ajv = new Ajv();
  ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
  _loadSchemas();
}

function validate(schemaId, data) {
  return ajv.validate(schemaId, data);
}

function validator(schemaId) {
  return function(req, res, next) {
    let valid = ajv.validate(schemaId, req);
    if (valid) {
      next();
    } else {
      next(new Error(ajv.errorsText()));
    }
  };
}

function validatorAsync(schemaId) {
  return async function(req, res) {
    let valid = ajv.validate(schemaId, req);
    if (!valid) {
      throw new Error(ajv.errorsText());
    }
  }
}

module.exports = {
  init,
  validate,
  validator,
  validatorAsync,
};
