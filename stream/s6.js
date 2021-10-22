const fs = require('fs')

const rs = fs.createReadStream('./../package-lock.json',{
  flags: 'r',
  encoding: null,
  highWaterMark: 100
})

// rs.on('data', chunk => {
//   console.log(chunk.toString())
// })
rs.on('readable',() => {
  let data = null
  while((data = rs.read(1)) !== null) {
    // console.log(data.toString())
    // console.log(rs._readableState.length)
  }
})

rs.on('open', fd => {
  console.log('fd:', fd)
})

rs.on('close', () => {
  console.log('文件关闭了')
})
rs.on('end', () => {
  console.log('当数据被清空之后')
})
rs.on('error', err => {
  console.log('err:', err)
})
