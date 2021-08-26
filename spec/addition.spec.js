const assert = require("assert");
const addition = require("./../addition");

describe("addition()", function() {
  // Arrange
  let a = 8;
  let b = 25;
  let sum = 33;

  //Act
  let result = addition(a, b);
  //Assert
  it("it should return sum of 33", function() {
    expect(result).toEqual(sum);
  });
});
