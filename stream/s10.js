const fs = require('fs')

const rs = fs.createReadStream('./../package-lock.json',{
  highWaterMark: 20
})
const ws = fs.createWriteStream('./test.txt',{
  highWaterMark: 16
})

// rs.on('data', chunk => {
//  const flag = ws.write(chunk,()=> {
//     console.log('写完了')
//   })
//   if (!flag) {
//     rs.pause()
//   }
//   console.log('flag:', flag)
// })
// ws.on('drain',()=> {
//   rs.resume()
// })

rs.pipe(ws)
