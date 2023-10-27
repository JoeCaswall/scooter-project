const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      london: [],
      birmingham: [],
      carlisle: [],
    };
    this.registeredUsers = {};
  }
  registerUser(username, password, age) {
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof age !== "number"
    ) {
      throw new Error("Invalid information type - try again");
    }
    if (Object.keys(app.registeredUsers).includes(username)) {
      throw new Error("Already registered");
    }
    if (age < 18) {
      throw new Error("Too young to register");
    }
    this.registeredUsers[username] = new User(username, password, age); // took SO long to figure out. Was trying to access the instance of User by just using the username, forgot it was the key of the registered users object that referred to the User instance.
    console.log("User has been registered");
    return this.registeredUsers[username];
  }
  loginUser(username, password) {
    if (!Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("Username or Password is incorrect");
    }
    this.registeredUsers[username].login(password);
  }
  logoutUser(username) {
    if (!Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("no such user is logged in");
    }
    if (this.registeredUsers[username].loggedIn !== true) {
      throw new Error("no such user is logged in");
    }
    this.registeredUsers[username].logout();
    console.log("User is logged out");
  }
  createScooter(station) {
    if (!Object.keys(this.stations).includes(station)) {
      throw new Error("No such station");
    }
    this.stations[station].push(new Scooter(station));
    return this.stations[station][this.stations[station].length - 1]; //also took me ages to work out how to return just one scooter.
  }
  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("Scooter already rented");
    }
    scooter.user = user;
    scooter.rent(user);
    let stationArr = Object.keys(this.stations);
    for (let x of stationArr) {
      if (this.stations[x].includes(scooter)) {
        this.stations[x].splice(this.stations[x].indexOf(scooter), 1);
      }
    }
    console.log("Scooter Docked");
  }
  dockScooter(scooter, station) {
    if (!Object.keys(this.stations).includes(station)) {
      throw new Error("No such station");
    }
    if (scooter.station === station) {
      throw new Error("This scooter is already at that station");
    }
    scooter.user = null;
    scooter.station = station;
    this.stations[station].push(scooter);
    console.log("Scooter docked");
  }
  print() {
    console.log("All registered users:");
    console.log(this.registeredUsers);
    console.log("All stations and their scooters:");
    console.log(this.stations);
  }
}

// app.registerUser("trollunderbridge", "feefifofum", 55);

// console.log(testScooter);
// console.log(app.stations);
// app.rentScooter(testScooter, user1);
// console.log(app.stations);

const app = new ScooterApp();

// let user1 = app.registerUser("user1", "qwerty", 26);
// let testScooter = app.createScooter("london");
// let testScooter2 = app.createScooter("london");

// console.log(app.stations["london"].includes(testScooter));
// app.rentScooter(testScooter, user1);

// console.log(app.stations["london"].includes(testScooter));
// console.log(testScooter.user);

module.exports = ScooterApp;
