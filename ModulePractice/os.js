import os from'os'
console.log(`Operating System:  ${os.platform()}`)  //use of Template litral
console.log("Operating System Type:  ", os.type())
console.log("Operating System Architecture:  ", os.arch())
console.log("CPU Total Cores:  ", os.cpus())
console.log("CPU Total Cores:  ", os.cpus().length)
console.log("user:  ", os.userInfo())