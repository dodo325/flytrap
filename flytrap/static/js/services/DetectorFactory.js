
class DetectorFactory {
  #detectors;

  constructor() {
    this.#detectors = {};
    this.data = {};
  }

  /**
   * @param {String} name Detector name (key)
   * @param {Function} detector The function that should be performed and present the data
   */
  add(name, detector) {
    if (!this.isEmpty(this.data)) {
      this.#detectors[name] = detector;
      this.data[name] = this.#detectors[name]();
    }

    this.#detectors[name] = detector;
  }

  /**
   * Initialization of detectors added to the stack
   */
  init() {
    Object.keys(this.#detectors).forEach((name) => {
      this.data[name] = this.#detectors[name]();
    });
  }

  getData() {
    return this.data;
  }

  /**
   *
   * @param {Object} obj
   * @returns {boolean}
   */
  isEmpty(obj) {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }
}
