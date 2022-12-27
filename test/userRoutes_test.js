const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
const server = require("../index");

const API = process.env.BASE_URL;
chai.use(chaiHttp);

describe("/POST testing user signup", () => {
  it("creates a new user", (done) => {
    chai
      .request(API)
      .post("/api/v1/user/signup")
      .send({
        name: "Seller231",
        email: "Seller@il.com",
        password: "Devs@12343",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.contain("Welcome User");
        done();
      });
  });
});
