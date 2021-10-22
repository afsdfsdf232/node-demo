const { Duplex } = require('stream')

class MyDuplex extends Duplex {
  constructor(soure){
    super()
    this.soure = soure
  }
  _read() {
    const data = this.soure.shift() || null
    this.push(data)
  }
  _write(chunk, en, next) {
    process.stdout.write(chunk)
    process.nextTick(next)
  }
}
const soure = ['a','b','c']
const myDuplex = new MyDuplex(soure)
myDuplex.on('data',chunk => {
  console.log(chunk.toString())
})
myDuplex.write('拉钩驾驭',()=> {
  console.log(1111)
})
