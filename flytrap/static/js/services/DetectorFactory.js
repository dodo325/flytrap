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
  async init() {
    for (const key of Object.keys(this.#detectors)) {
      this.data[key] = await this.#detectors[key]();
    }
  }

  getAll() {
    return this.data;
  }

  get(name) {
    return this.data[name];
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
