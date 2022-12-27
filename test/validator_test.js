const {
  validateEmail,
  validatePassword,
  validateUsername,
} = require("../utils/validators");

var expect = require("chai").expect;

describe("testing validators", function () {
  it("should return ture for valid names", function () {
    expect(validateUsername("Seller123")).to.equal(true);
  });

  it("should return false for invalid names", function () {
    expect(validateUsername("Niti")).to.equal(false);
  });

  it("should return ture for valid email", function () {
    expect(validateEmail("abc@xyx.com")).to.equal(true);
  });

  it("should return false for invalid email", function () {
    expect(validateEmail("Niti.xy.com")).to.equal(false);
  });

  it("should return ture for valid password", function () {
    expect(validatePassword("Devs@123")).to.equal(true);
  });

  it("should return false for invalid password", function () {
    expect(validatePassword("devs")).to.equal(false);
  });
});
