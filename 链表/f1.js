const fs = require('fs')
const EventEmitter = require('events')
const Queue = require('./l2')

class MyWriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    const { flags, mode, autoClose, start, encoding, highWaterMark } = options
    this.path = path
    this.flags = flags || 'w'
    this.mode = mode || 438
    this.autoClose = autoClose || true
    this.start = start || 0
    this.encoding = encoding || 'utf8'
    this.highWaterMark = highWaterMark || 16 * 1024
    this.writeoffset = this.start
    this.writing = false
    this.writLen = 0
    this.needDrain = false
    this.cache = new Queue()
    this.open()
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) this.emit('error', err);
      this.emit('open', fd)
    })
  }
  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb))
    }
    fs.write(this.fd, chunk, this.start, chunk.length, this.writeoffset, (err, data) => {
      if (err) {
        this.emit('error', err)
      } else {
        this.writeoffset += data;
        this.writLen -= data
        cb && cb()
        // this.emit('data', data)
      }


    })

  }
  write(chunk, encoding = 'utf8', cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.writLen += chunk.length
    const flag = this.writLen < this.highWaterMark
    this.needDrain = !flag
    if (this.writing) {
      // 把内容放进缓存区
      this.cache.enQueue()
    } else {
      // 当前未执行写入那么就执行写入
      this.writing = true
      
      this._write(chunk, encoding, ()=> {
        cb()
        this._clearBuffer()
      })
    }
    return flag;
  }
  _clearBuffer(){
    let data = this.cache.deQueue()
    if (data) {
      this._write(data.element.chunk,data.element.encoding,()=> {
        this._clearBuffer()
      } )
    } else {
      if (this.needDrain) {
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
}
const ws = new MyWriteStream('./../package-lock.json', {})
ws.on('open', fd => {
  console.log('open---', fd)
})

ws.on('error', err => {
  console.log('err:', err)
})

ws.write('1', 'utf8', () => {

})
