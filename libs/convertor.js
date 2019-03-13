"use strict";

function _convert(value, type) {
  switch (type) {
  case "number":
    return Number(value);
  case "array":
  case "object":
    return JSON.parse(value);
  default:
    throw new Error(`type=[${type}] is not supported in convertor`);
  }
}

function query(opts) {
  return function(req, res, next) {
    try {
      opts = opts || [];

      opts.forEach(opt => {
        if (req.query.hasOwnProperty(opt[0])) {
          try {
            req.query[opt[0]] = _convert(req.query[opt[0]], opt[1]);
          } catch(error) {
            throw new Error(`query '${opt[0]}' should be ${opt[1]}`);
          }
        }
      });

      next();
    } catch(error) {
      next(error);
    }
  }
}

function queryAsync(opts) {
  return async function(req, res) {
    opts = opts || [];

    opts.forEach(opt => {
      if (req.query.hasOwnProperty(opt[0])) {
        try {
          req.query[opt[0]] = _convert(req.query[opt[0]], opt[1]);
        } catch(error) {
          throw new Error(`query '${opt[0]}' should be ${opt[1]}`);
        }
      }
    });
  }
}

function param(opts) {
  return function(req, res, next) {
    try {
      opts = opts || [];

      opts.forEach(opt => {
        if (req.params.hasOwnProperty(opt[0])) {
          try {
            req.params[opt[0]] = _convert(req.params[opt[0]], opt[1]);
          } catch(error) {
            throw new Error(`param '${opt[0]}' should be ${opt[1]}`);
          }
        }
      });

      next();
    } catch(error) {
      next(error);
    }
  }
}

function paramAsync(opts) {
  return function(req, res, next) {
    opts = opts || [];

    opts.forEach(opt => {
      if (req.params.hasOwnProperty(opt[0])) {
        try {
          req.params[opt[0]] = _convert(req.params[opt[0]], opt[1]);
        } catch(error) {
          throw new Error(`param '${opt[0]}' should be ${opt[1]}`);
        }
      }
    });
  }
}

module.exports = {
  query,
  queryAsync,
  param,
  paramAsync,
};
