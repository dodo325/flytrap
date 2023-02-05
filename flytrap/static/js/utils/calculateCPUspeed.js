// супер не точно!
function calculateCPUspeed() {
  const _speedConstant = 8.9997e-9; //if speed=(c*a)/t, then constant=(s*t)/a and time=(a*c)/s
  const d = new Date();
  const amount = 150000000;
  const estProcessor = 1.7; //average processor speed, in GHZ
  console.log("JSBenchmark by Aaron Becker, running loop " + amount + " times.     Estimated time (for "+estProcessor+"ghz processor) is "+(Math.round(((_speedConstant*amount)/estProcessor)*100)/100)+"s");
  for (let i = amount; i > 0; i--) {}
  const newd = new Date();
  const accnewd = Number(String(newd.getSeconds()) + "." + String(newd.getMilliseconds()));
  const accd = Number(String(d.getSeconds()) + "." + String(d.getMilliseconds()));
  let di = accnewd - accd;

  // console.log(accnewd,accd,di);

  if (d.getMinutes() !== newd.getMinutes()) {
    di = (60*(newd.getMinutes()-d.getMinutes()))+di
  }
  spd = ((_speedConstant*amount)/di);

  return {
    "time": Math.round(di*1000)/1000, // seconds
    "estimated": Math.round(spd*1000)/1000 // GHZ
  }
}
