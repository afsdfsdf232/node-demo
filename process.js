// console.log(process)cls
// 资源 cup 内存
Buffer.alloc(10)
const memory = process.memoryUsage();
const cpu = process.cpuUsage()
// console.log(cpu,process.arch,process.platform)
// console.log(process.argv)
// console.log(process.uptime())
// 事件
// process.on('exit',code => {
//   console.log('退出code:',code)
// })
// process.on('beforeExit',code=> {
//   console.log('退出之前-beforeExit:',code)
// })
// console.log = data => {
//   process.stdout.write('__'+data+'\n')
// }
// console.log('haha')
const fs = require('fs')
fs.createReadStream('package.json').pipe(process.stdout)
