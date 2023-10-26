const Scooter = require("../src/Scooter");
const User = require("../src/User");
import { describe, it, expect } from "@jest/globals";

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
  //dock method
  //requestRepair method
  //charge method
});
