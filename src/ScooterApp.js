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
  register(username, password, age) {
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
    this.registeredUsers[username] = new User(username, password, age);
    console.log("User has been registered");
    return this.registeredUsers[username];
  }
  loginUser(username, password) {
    if (!Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("Username or Password is incorrect");
    }
    this.registeredUsers[username].login(password);
  }
}

const app = new ScooterApp();
app.register("trollunderbridge", "feefifofum", 55);
app.register("solarwhale", "qwerty", 26);

console.log(app.registeredUsers["solarwhale"]);
app.loginUser("solarwhale", "qwert");
console.log(app.registeredUsers["solarwhale"]);
