const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end
    this.highwaterMark = options.highwaterMark || 64 * 1024
    this.readOffset = 0
    this.open()
    this.on('newListener', type => {
      if (type === 'data') {
        // 已经监听了data事件
        this.read()
      }
    })
  }
  open() {
    // 原生open方法打开
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }
  close(){
    fs.close(this.fd,()=> {
      this.emit('close')
    })
  }
  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }
    let buf = Buffer.alloc(this.highwaterMark)
    let howMuchToRead
    if (this.end) {
      howMuchToRead = Math.min(this.end-this.readOffset+1,this.highwaterMark)
    } else {
      howMuchToRead = this.highwaterMark
    }
    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
      if (err) this.emit('error', err);
      if (readBytes) {
        this.readOffset += readBytes
        this.emit('data',buf.slice(0, readBytes))
        this.read()
      } else {
        this.emit('end')
        this.close()
      }
    })
  }
}

let rs = new MyFileReadStream('./../b.txt',{
  highwaterMark: 3,
  end: 0
})

rs.on('open', fd => {
  console.log('open:', fd)
})
rs.on('data', chunk => {
  console.log('chunk:', chunk.toString())
})
rs.on('error', error => {
  console.log('error:', error)
})
rs.on('end',()=> {
  console.log('结束')
})
rs.on('close',()=> {
  console.log('close')
})
