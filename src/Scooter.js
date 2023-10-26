class Scooter {
  static nextSerial = 1;
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    this.charge = 100;
    this.isBroken = false;
    Scooter.nextSerial++;
  }
  rent(user) {
    if (this.charge < 20) {
      throw new Error("Scooter needs to charge");
    }
    if (this.isBroken) {
      throw new Error("Scooter needs repair");
    }
    this.station = null;
    this.user = user;
  }
  dock(station) {
    this.user = null;
    this.station = station;
  }
}

module.exports = Scooter;
