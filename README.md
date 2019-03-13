# Json Schema Validator for Express Request

A validator using [ajv](https://www.npmjs.com/package/ajv) to validate input in Express request.

## __Installation__

Using npm:

    npm install --save @ansuz-dev/request-validator

## __Usage__

### Initialization

    const { validator } = require("@ansuz-dev/request-validator");

    validator.init({
      // point to directory containing schemas
      // schemas are loaded recursively in sub-directory
      schemas: path.join(__dirname, "schemas")
    });

The json schema in `schemas` directory should be formated as:

    {
      "$id": "/api/post/param",
      "type": "object",
      "properties": {
        "body": {
          "type": "object",
          "properties": {
            "userId": {
              "$ref": "/core#/definitions/uint"
            },
            "postId": {
              "$ref": "/core#/definitions/uint"
            }
          },
          "additionProperties": false,
          "required": [ "userId", "postId" ]
        },
        "params": {
          "type": "object",
          "properties": {
            "id": {
              "$ref": "/core#/definitions/uint"
            }
          },
          "additionProperties": false,
          "required": [ "id" ]
        }
      },
      "required": [ "body", "params" ]
    }

Depends on the require, you could have `body`, `params` or `query` property.

### Use as middleware

Once initialization, the validator could be used as middleware in your route:

    const { validator } = require("@ansuz-dev/request-validator");
    const router = express.Router();

    router.get("/param/:id", [
      validator.validator("/api/get/param"),
      // TODO: your real handler here
    ]);

    router.post("/param/:id", [
      validator.validator("/api/post/param"),
      // TODO: your real handler here
    ]);

It also works with [async-router](https://www.npmjs.com/package/@ansuz-dev/async-router):

    const { Router } = require("@ansuz-dev/async-router");
    const { validator } = require("@ansuz-dev/request-validator");

    const router = new Router();

    router.get("/query", [
      validator.validatorAsync("/api/get/query"),
      async (req, res) => {
        // TODO: your code here
      }
    ]);

### Convert `query` and `param` value

Add a simple convertor before validating your request:

    const { validator, convertor } = require("@ansuz-dev/request-validator");
    const router = express.Router();

    router.get("/param/:id", [
      convertor.param([
        ["id", "number"]
      ]),
      validator.validator("/api/get/param"),
      // TODO: your real handler here
    ]);

    router.post("/param/:id", [
      convertor.param([
        ["id", "number"]
      ]),
      validator.validator("/api/post/param"),
      // TODO: your real handler here
    ]);

and for asynchronous version:

    const { Router } = require("@ansuz-dev/async-router");
    const { validator, convertor } = require("@ansuz-dev/request-validator");

    const router = new Router();

    router.get("/query", [
      convertor.queryAsync([
        ["ids", "array"]
      ]),
      validator.validatorAsync("/api/get/query"),
      async (req, res) => {
        // TODO: your code here
      }
    ]);

### API

  - validator
```
    validator.init({
      schemas: "<defined schemas directory>"
    })

    validator.validate(schemaId, data) : return boolean value

    validator.validator(schemaId) : return a middle function

    validator.validatorAsync(schemaId) : return an async middle function
```

  - convertor
```
    // convert value in query object
    // `type` could be `number`, `array`, or `object`
    convertor.query([
      [ "<name>", "<type>" ],
      ...
    ]) : return a middle function

    convert.queryAsync([
      [ "<name>", "<type>" ],
      ...
    ]) : return an async middle function

    // convert value in param object
    // `type` could be `number`, `array`, or `object`
    convertor.param([
      [ "<name>", "<type>" ],
      ...
    ]) : return a middle function

    convert.paramAsync([
      [ "<name>", "<type>" ],
      ...
    ]) : return an async middle function
```

### Example

Check on [Github](https://github.com/ansuz-dev/request-validator/test/app.js).

## License

MIT
