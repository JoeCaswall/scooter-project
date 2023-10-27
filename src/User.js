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
      throw new Error("Username or Password is incorrect");
    }
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
  }
  getPassword() {
    return this.#password;
  }
  getAge() {
    return this.#age;
  }
}

module.exports = User;
