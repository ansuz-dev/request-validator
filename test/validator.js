const path = require("path");
const chai = require("chai");

const expect = chai.expect;
const assert = chai.assert;

const {validator} = require("../index");

describe("validator", () => {
  describe("init", () => {
    it("should init without config data", () => {
      validator.init();
    });

    it("should init with config data", () => {
      validator.init({
        schemas: path.join(__dirname, "schemas")
      });
    });
  });

  describe("validate", () => {
    it("should return true when validating data with test schema 1", () => {
      validator.init({
        schemas: path.join(__dirname, "schemas")
      });

      let valid = validator.validate("/test/schema/1", {
        body: {
          userId: 5,
          postId: 6
        }
      });

      assert.isTrue(valid);
    });

    it("should return false when validating data with test schema 1", () => {
      validator.init({
        schemas: path.join(__dirname, "schemas")
      });

      let valid = validator.validate("/test/schema/1", {
        body: {
          userId: 5,
          postId: "6",
        }
      });

      assert.isFalse(valid);
    });
  })
});
