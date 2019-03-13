const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
chai.should();

const app = require("./app");

describe("api", () => {
  it("should get /api/param/1", () => {
    return chai.request(app)
      .get("/api/param/1")
      .then((res) => {
        expect(res).to.have.status(200);
        assert.equal(res.body.message, "get param id=[1]");
     });
  });

  it("should get /api/param/2.0", () => {
    return chai.request(app)
      .get("/api/param/2.0")
      .then((res) => {
        expect(res).to.have.status(200);
        assert.equal(res.body.message, "get param id=[2]");
     });
  });

  it("should not get /api/param/a", () => {
    return chai.request(app)
      .get("/api/param/a")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.params.id should be integer");
     });
  });

  it("should not get /api/param/1.3", () => {
    return chai.request(app)
      .get("/api/param/1.3")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.params.id should be integer");
     });
  });

  it("should post /api/param/1", () => {
    return chai.request(app)
      .post("/api/param/1")
      .set("content-type", "application/json")
      .send({ userId: 1, postId: 2 })
      .then((res) => {
        expect(res).to.have.status(200);
        assert.equal(res.body.message, "post param id=[1]");
     });
  });

  it("should not post /api/param/a", () => {
    return chai.request(app)
      .post("/api/param/a")
      .set("content-type", "application/json")
      .send({ userId: 1, postId: 2 })
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.params.id should be integer");
     });
  });

  it("should not post /api/param/1 with invalid data", () => {
    return chai.request(app)
      .post("/api/param/1")
      .set("content-type", "application/json")
      .send({ userId: 1, postId: "2" })
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.body.postId should be integer");
     });
  });

  it("should get /api/query", () => {
    return chai.request(app)
      .get("/api/query?ids=[1,2,3]")
      .then((res) => {
        expect(res).to.have.status(200);
        assert.equal(res.body.message, "get query");
     });
  });

  it("should not get /api/query if missing ids", () => {
    return chai.request(app)
      .get("/api/query")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.query should have required property 'ids'");
     });
  });

  it("should not get /api/query if ids is not array", () => {
    return chai.request(app)
      .get("/api/query?ids=abc")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "query 'ids' should be array");
     });
  });

  it("should not get /api/query if ids is invalid array", () => {
    return chai.request(app)
      .get("/api/query?ids=[%22a%22%2C%22b%22%2C%22c%22]")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.query.ids[0] should be integer");
     });
  });

  it("should get /async/query", () => {
    return chai.request(app)
      .get("/async/query?ids=[1,2,3]")
      .then((res) => {
        expect(res).to.have.status(200);
        assert.equal(res.body.message, "get async query");
     });
  });

  it("should not get /async/query if missing ids", () => {
    return chai.request(app)
      .get("/async/query")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.query should have required property 'ids'");
     });
  });

  it("should not get /async/query if ids is not array", () => {
    return chai.request(app)
      .get("/async/query?ids=abc")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "query 'ids' should be array");
     });
  });

  it("should not get /async/query if ids is invalid array", () => {
    return chai.request(app)
      .get("/async/query?ids=[%22a%22%2C%22b%22%2C%22c%22]")
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.message, "data.query.ids[0] should be integer");
     });
  });

});
