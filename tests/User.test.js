const User = require("../src/User");

const user = new User("Joe Bloggs", "test123", 21);
// import { describe, it, expect } from "@jest/globals";

// User tests here
describe("User property tests", () => {
  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  });
  // test password
  it("password should be a string", () => {
    expect(typeof user.getPassword()).toBe("string");
  });
  // test age
  it("age should be a number", () => {
    expect(typeof user.getAge()).toBe("number");
  });
});

describe("User method tests", () => {
  // test login
  it("fails to login if password is incorrect", () => {
    expect(() =>
      user.login("test12").toThrow("Username or Password is incorrect")
    );
    expect(user.loggedIn).toBe(false);
  });
  it("logs the user in with correct password", () => {
    user.login("test123");
    expect(user.loggedIn).toBe(true);
  });
  // test logout
  it("logs the user out successfully", () => {
    user.login("test123");
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
  //test getPassword
  it("returns the private password property", () => {
    expect(user.getPassword()).toBe("test123");
  });
});
