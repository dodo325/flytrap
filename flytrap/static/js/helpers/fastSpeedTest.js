function fastSpeedTest(
  callback,
  imageAddr = "https://upload.wikimedia.org/wikipedia/commons/0/01/Sof%C3%ADa_Vergara_3_May_2014_%28cropped%29.jpg",
  downloadSize = 2104238
) {
  let startTime, endTime;
  const download = new Image();
  download.onload = function () {
    endTime = (new Date()).getTime();
    showResults();
  }

  download.onerror = function (err, msg) {
    callback({"error": msg});
  }

  startTime = (new Date()).getTime();
  const cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;

  function showResults() {
    const duration = (endTime - startTime) / 1000;
    const bitsLoaded = downloadSize * 8;
    const speedBps = (bitsLoaded / duration).toFixed(2);
    const speedKbps = (speedBps / 1024).toFixed(2);
    const speedMbps = (speedKbps / 1024).toFixed(2);
    callback({"speedMbps": speedMbps});
  }
}
