const fs = require('fs')

const ws = fs.createWriteStream('./test.txt',{
  highWaterMark: 3
})

let source = 'ćéŠćč˛'.split('')

let num = 0

let flag= true

function executeWrite () {
  flag = true
  while(num !== 4 && flag) {
    flag = ws.write(source[num])
    num++
  }
}
executeWrite()
ws.on('drain',()=> {
  executeWrite()
})
