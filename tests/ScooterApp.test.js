const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");
// import { describe, it, expect } from "@jest/globals";

const scooterApp = new ScooterApp();
// ScooterApp tests here

// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
});

// log in
describe("loginUser method tests", () => {
  it("Should throw correct error if username is incorrect", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(() => scooterApp.loginUser("Joe Blogg", "test123")).toThrow(
      "Username or Password is incorrect"
    );
  });
  it("correctly logs in the user if username and password are correct", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    expect(response.loggedIn).toBe(true);
  });
});
// log out
describe("logoutUser method tests", () => {
  it("throws correct error if user doesn't exist", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    expect(() => scooterApp.logoutUser("Joe Blogg")).toThrow(
      "no such user is logged in"
    );
  });
  it("throws correct error if user isn't logged in", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(() => scooterApp.logoutUser("Joe Bloggs")).toThrow(
      "no such user is logged in"
    );
  });
  it("successfully logs out user if they exist and are logged in", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    scooterApp.loginUser("Joe Bloggs", "test123");
    scooterApp.logoutUser("Joe Bloggs");
    expect(response.loggedIn).toBe(false);
  });
});
// create scooter tests
describe("createScooter method tests", () => {
  it("throws correct error if station does not exist", () => {
    expect(() => scooterApp.createScooter("peckham")).toThrow(
      "No such station"
    );
  });
  it("correctly creates a new scooter and adds it to the station's scooter array", () => {
    scooterApp.createScooter("london");
    scooterApp.createScooter("birmingham");
    scooterApp.createScooter("carlisle");
    expect(scooterApp.stations.london[0]).toBeInstanceOf(Scooter);
    expect(scooterApp.stations.birmingham[0]).toBeInstanceOf(Scooter);
    expect(scooterApp.stations.birmingham[0]).toBeInstanceOf(Scooter);
  });
});
//rent scooter tests
describe("rentScooter method tests", () => {
  it("throws correct error if scooter is already rented", () => {
    let scooter1 = scooterApp.createScooter("london");
    let testUser = scooterApp.registerUser("testUser", "qwerty", 26);
    let testUser2 = scooterApp.registerUser("testUser2", "uiop", 26);
    scooterApp.rentScooter(scooter1, testUser);
    expect(() => scooterApp.rentScooter(scooter1, testUser2)).toThrow(
      "Scooter already rented"
    );
  });
  it("successfully rents out scooter to correct user and removes it from station", () => {
    let scooter1 = scooterApp.createScooter("london");
    let testUser = scooterApp.registerUser("testUser", "qwerty", 26);
    scooterApp.rentScooter(scooter1, testUser);
    expect(scooterApp.stations["london"].includes(scooter1)).toBe(false);
    expect(scooter1.user).toEqual(testUser);
  });
});
// dock scooter tests
describe("dockScooter method tests", () => {
  it("throws correct error when station doesnt exist", () => {
    let scooter1 = scooterApp.createScooter("london");
    expect(() => scooterApp.dockScooter(scooter1, "peckham")).toThrow(
      "No such station"
    );
  });
  it("throws correct error if scooter is already at that station", () => {
    let scooter1 = scooterApp.createScooter("london");
    expect(() => scooterApp.dockScooter(scooter1, "london")).toThrow(
      "This scooter is already at that station"
    );
  });
  it("docks scooter at station correctly and removes it from user", () => {
    let user1 = scooterApp.registerUser("user1", "qwerty", 26);
    let scooter1 = scooterApp.createScooter("london");
    scooterApp.rentScooter(scooter1, user1);
    scooterApp.dockScooter(scooter1, "london");
    expect(scooter1.user).toEqual(null);
    expect(scooter1.station).toBe("london");
    expect(scooterApp.stations["london"].includes(scooter1)).toBe(true);
  });
});
