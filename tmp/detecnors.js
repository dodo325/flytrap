
/**
 * https://stackoverflow.com/questions/3514784/how-to-detect-a-mobile-device-using-jquery
 * @returns boolean
 */
function isMobileByScreen() {
  return window.matchMedia("only screen and (max-width: 760px)").matches;
}
