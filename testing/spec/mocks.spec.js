const sinon = require("sinon");
const capitalize = require("../scripts/capitalize");

const Capitalizer = {
  capitalize,
};

describe("testing the mocked methods", () => {
  it("verifies capitalize mocks", () => {
    const mock = sinon.mock(Capitalizer);
    const arr = ["a", "b", "c", "d", "e"];

    mock.expects("capitalize").exactly(5).withArgs.apply(sinon, arr);
    arr.map(Capitalizer.capitalize);
    expect(mock.verify()).to.be.true;
  });
});
