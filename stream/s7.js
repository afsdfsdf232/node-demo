const fs = require('fs')

const ws = fs.createWriteStream('test.txt', {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3
})

ws.write('拉钩教育', () => {
  console.log('ok1')
})
ws.write('123456789', () => {
  console.log('ok2')
})
ws.on('open', fd=> {
  console.log('open:', fd)
})
// end执行之后才会执行close
ws.on('close', ()=> {
  console.log('close')
})
ws.on('error', error => {
  console.log('err:', error)
})
ws.end()

