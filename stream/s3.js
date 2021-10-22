const { Writable } = require('stream')

class MyWritable extends Writable {
  constructor() {
    super()
  }
  _write(chunk, end, done) {
    process.stdout.write(chunk.toString())
    process.nextTick(done)
  }
}

const myWritable = new MyWritable()
myWritable.write('拉钩教育','utf-8',()=> {
  console.log('end')
})
