class Cookie {
  /**
   * 
   * @param {string} name 
   * @param {string} value 
   * @param {number} days 
   */
  setCookie(name, value = "", days) {
    let expires = "";

    if (days) {
      const date = new Date();
      const milliseconds = date.getTime() + daysInMilliseconds(days); 

      date.setTime(milliseconds);
      expires = "; expires=" + date.toUTCString();
    } 
      
    document.cookie = `${name}=${value}${expires}; path=/`;
  }
}

/**
 * 
 * @param {number} days
 * @return {number}
 */
 function daysInMilliseconds (days) {
  return Math.round(days * 24 * 60 * 60 * 1000);
}
