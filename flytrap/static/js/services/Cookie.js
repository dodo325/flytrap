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

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  getCookies(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
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
