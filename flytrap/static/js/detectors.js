function isMobileByScreen() {
  const {userAgent, platform, maxTouchPoints, userAgentData} = window.navigator;

  const isIOS = /(iphone|ipod|ipad)/i.test(userAgent);
  const _platform = platform || userAgentData.platform;

  const isIpad = _platform === 'iPad' || (_platform === 'MacIntel' && maxTouchPoints > 0 && !window.MSStream);
  const isAndroid = /android/i.test(userAgent);

  return isAndroid || isIOS || isIpad;
}

function getPerformance() {
  return window.performance
    || window.mozPerformance
    || window.msPerformance
    || window.webkitPerformance
    || {};
}

function detectGPU() {
  let canvas = document.createElement('canvas');
  let performance = getPerformance();
  let data = {};
  let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    data["dbgRenderInfo"] = debugInfo;
    data["UNMASKED_VENDOR_WEBGL"] = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    data["UNMASKED_RENDERER_WEBGL"] = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    data["VENDOR"] = gl.getParameter(gl.VENDOR);
    data["RENDERER"] = gl.getParameter(gl.VENDOR);
  }

  data["performance"] = performance;
  return data;
}

function detectScreen() {
  let data = {};

  data["height"] = screen.height; // Device screen height (i.e. all physically visible stuff)
  data["width"] = screen.width;  // Device screen width (that is, all physically visible stuff).

  data["availHeight"] = screen.availHeight; // Device screen height minus the operating system taskbar (if present).
  data["availWidth"] = screen.availWidth;  // Device screen width, minus the operating system taskbar (if present).

  data["clientHeight"] = document.body.clientHeight; // Inner height of the HTML document body, including padding but not the horizontal scrollbar height, border, or margin.
  data["clientWidth"] = document.body.clientWidth;  // Full width of the HTML page as coded, minus the vertical scroll bar.

  data["innerHeight"] = window.innerHeight; // The current document's viewport height, minus taskbars, and so on.
  data["innerWidth"] = window.innerWidth;  // The browser viewport width (including vertical scroll bar, includes padding but not border or margin).

  data["outerHeight"] = window.outerHeight; // Height the current window visibly takes up on screen (including taskbars, menus, and so on.)
  data["outerWidth"] = window.outerWidth;  // The outer window width (including vertical scroll bar, toolbars, etc., includes padding and border but not margin).

  data["isMobile"] = isMobileByScreen();

  return data;
}

async function detectBattery() {
  const errorText = "Battery API not supported on your device/computer";
  const isBatterySupported = "getBattery" in navigator;

  if (!isBatterySupported) return errorText;

  const battery = await navigator.getBattery();

  if (!battery) return errorText;

  const batteryLevel = Math.round(battery.level * 100) + "%";
  const chargingStatus = battery.charging ? "yes" : "not ";
  const batteryCharged = inInfinity(battery.chargingTime)
      ? "Infinity"
      : parseInt(battery.chargingTime / 60, 10);
  const batteryDischarged = inInfinity(battery.dischargingTime)
      ? "Infinity"
      : parseInt(battery.dischargingTime / 60, 10);

  return {
    batteryLevel,
    chargingStatus,
    batteryCharged,
    batteryDischarged
  };
}

// Uses the library `lib/detectIncognito.js` to understand the browser's incognito
async function browserMode() {
  const detectors = await detectIncognito();

  return {
    doNotTrack: navigator.doNotTrack,
    ...detectors,
  };
}

function getNavigatorData() {
  return {
    "appCodeName": navigator.appCodeName, // Устарело
    "appName": navigator.appName, // Устарело
    "appVersion": navigator.appVersion, // Устарело
    "buildID": navigator.buildID,
    "cookieEnabled": navigator.cookieEnabled,
    "doNotTrack": navigator.doNotTrack,
    "hardwareConcurrency": navigator.hardwareConcurrency,
    "language": navigator.language,
    "languages": navigator.languages,
    "maxTouchPoints": navigator.maxTouchPoints,
    "onLine": navigator.onLine,
    "oscpu": navigator.oscpu,
    "pdfViewerEnabled": navigator.pdfViewerEnabled,
    "platform": navigator.platform,
    "product": navigator.product,
    "productSub": navigator.productSub,
    "userAgent": navigator.userAgent,
    "vendor": navigator.vendor,
    "vendorSub": navigator.vendorSub,
    "webdriver": navigator.webdriver,
    "javaEnabled": navigator.javaEnabled(),
  }
}

function getNetworkInfo() {
  if (!navigator.connection) return false;

  return {
    "type": navigator.connection.type, "downlink": navigator.connection.downlink, // ' Mb/s'
    "rtt": navigator.connection.rtt, // ms
    "downlinkMax": navigator.connection.downlinkMax, // Mb/s
    "effectiveType": navigator.connection.effectiveType, "saveData": navigator.connection.saveData,
  }
}

function getJSVersion() {
  const versions = ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"];
  const _length = versions.length;
  const tagScript = document.getElementsByTagName('script')[0];

  // Как глобальная переменная в window
  globalJSVersion = "";

  for (i = 0; i < _length; i++) {
    const g = document.createElement('script');

    g.setAttribute("language", "JavaScript" + versions[i]);

    // Перезаписывает globalJSVersion версией пользователя
    g.text = "globalJSVersion='" + versions[i] + "';";
    tagScript.parentNode.insertBefore(g, tagScript);
  }

  return globalJSVersion;
}

async function detectPublicIP() {
  let data;
  const response = await fetch("https://api.ipregistry.co/?key=tryout");

  if (response.ok) {
    data = await response.json();
  } else {
    const response = await fetch("https://ipapi.co/json/");
    data = await response.json();
  }

  return data;
}
