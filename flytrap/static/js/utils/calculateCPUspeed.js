// супер не точно!
function calculateCPUspeed() {
  var _speedconstant = 8.9997e-9; //if speed=(c*a)/t, then constant=(s*t)/a and time=(a*c)/s
  var d = new Date();
  var amount = 150000000;
  var estprocessor = 1.7; //average processor speed, in GHZ
  console.log("JSBenchmark by Aaron Becker, running loop " + amount + " times.     Estimated time (for "+estprocessor+"ghz processor) is "+(Math.round(((_speedconstant*amount)/estprocessor)*100)/100)+"s");
  for (var i = amount; i > 0; i--) {}
  var newd = new Date();
  var accnewd = Number(String(newd.getSeconds())+"."+String(newd.getMilliseconds()));
  var accd = Number(String(d.getSeconds())+"."+String(d.getMilliseconds()));
  var di = accnewd-accd;

  // console.log(accnewd,accd,di);

  if (d.getMinutes() != newd.getMinutes()) {
    di = (60*(newd.getMinutes()-d.getMinutes()))+di
  }
  spd = ((_speedconstant*amount)/di);

  return {
    "time": Math.round(di*1000)/1000, // seconds
    "estimated": Math.round(spd*1000)/1000 // GHZ
  }
}