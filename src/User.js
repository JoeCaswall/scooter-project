class User {
  #password;
  #age;
  constructor(username, password, age) {
    this.username = username;
    this.#password = password;
    this.#age = age;
    this.loggedIn = false;
  }
  login(password) {
    if (password !== this.#password) {
      throw new Error("Incorrect Password");
    }
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
  }
  getPassword() {
    return this.#password;
  }
}

module.exports = User;
