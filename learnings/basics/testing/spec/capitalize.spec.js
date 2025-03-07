const capitalize = require("../scripts/capitalize");

describe("Testing capitalization", () => {
  it("capitalizes a string", () => {
    const result = capitalize("foobar");
    expect(result).to.be.a("string").and.equal("Foobar");
  });
});
