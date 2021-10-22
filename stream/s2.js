const fs = require('fs')
const { Readable } = require('stream')
// 自定义可读流
let source = ['lg','zce','syy']

class MyReadable extends Readable {
  constructor(){
    super()
    this.source = source
  }
  _read() {
    let data = this.source.shift() || null
    this.push(data)
  }
}

const myReadable = new MyReadable(source)
// myReadable.on('readable',()=> {
//   let data = null
//   while((data = myReadable.read(2)) !== null)
//   console.log(data.toString())
// })
myReadable.on('data', chunk => console.log('chunk:', chunk.toString()))
