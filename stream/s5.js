const { Transform } = require('stream')

class MyTransform extends Transform {
  constructor(){
    super()
  }
  _transform(chunk, en, cb) {
    this.push(chunk.toString().toUpperCase())
    cb(null)
  }
}

const myTransform = new MyTransform()
myTransform.write('abcdefg')
myTransform.on('data', chunk => {
  console.log(chunk.toString())
})
