const os = require('os') //빌트인 함수, 모듈 

console.log('호스트네임:',os.hostname());

console.log('임시폴더경로:', os.tmpdir());

console.log('CPU정보:', os.cpus());

console.log('메모리 정보:', os.totalmem());

const mem_in_gb = os.totalmem() / 1824 / 1824 / 1824; 
console.log('메모리량:', mem_in_gb);

console.log(os.platform)
console.log(os.networkInterfaces)
console.log(os.platform)

