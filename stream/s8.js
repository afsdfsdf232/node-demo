const fs = require('fs')
const ws = fs.createWriteStream('./test.txt',{
  highWaterMark: 3
})

// 如果flag为false并不是写入失败
// 写入数据量大于设置的写入大小的值
const flag = ws.write('123456')
console.log('flag:', flag)

// drain
