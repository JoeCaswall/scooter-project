const Scooter = require("../src/Scooter");
const User = require("../src/User");
// import { describe, it, expect } from "@jest/globals";

//typeof scooter === object
describe("scooter object", () => {
  test("Scooter class should create Scooter instance", () => {
    const scooter = new Scooter();
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

//Method tests
describe("scooter methods", () => {
  //rent method
  it("rent should fail if the battery is too low", () => {
    const testScooter = new Scooter("london");
    testScooter["charge"] = 15;
    expect(() => testScooter.rent("testUser")).toThrow(
      "Scooter needs to charge"
    );
  });
  it("rent should fail if the scooter is damaged", () => {
    const testScooter = new Scooter("london");
    testScooter["isBroken"] = true;
    expect(() => testScooter.rent("testUser")).toThrow("Scooter needs repair");
  });
  it("accepts an instance of user when successful and sets station to null", () => {
    const testScooter = new Scooter("london");
    const testUser = new User("testUser", "qwerty", 26);
    testScooter.rent(testUser);
    expect(testScooter.user).toEqual(testUser);
    expect(testScooter.station).toBe(null);
  });
  //dock method
  it("docks the scooter at the requested station and clears the user from the scooter", () => {
    const testScooter = new Scooter("london");
    const testUser = new User("testUser", "qwerty", 26);
    testScooter.rent(testUser);
    testScooter.dock("London");
    expect(testScooter.user).toBe(null);
    expect(testScooter.station).toBe("London");
  });
  //requestRepair method
  //charge method
});
