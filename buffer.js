// 无需require
// 实现Node.js平台下的二进制数据操作
// 不占据V8堆内存大小的内存空间
// 内存的使用由node控制，由V8的GC回收
// 一般配合stream流使用，充当数据缓冲区

// alloc: 创建指定大小的buffer
// allocUnsafe: 创建指定大小的buffer 不安全
// from: 可以接收数据源

// const b1 = Buffer.alloc(1024)
// console.log(b1)
// const b2 = Buffer.allocUnsafe(1024)
// console.log(b2)
// const b3 = Buffer.from('1')
// console.log(b3)
// const b4 = Buffer.from([1,2,3,4,5,6,7,8,9,0])
// console.log(b4)

// Buffer 实例方法

// .fill: 使用数据填充 buffer
// const b1 = Buffer.alloc(6)
// b1.fill(3)
// console.log(b1)

// .write: 向buffer中写入数据
// b1.write('123',1)
// console.log(b1)

// .toString: 从buffer中提取数据
// const b2 = Buffer.from('黄攀你好')
// console.log(b2.toString('utf8',3))

// .slice: 截取buffer
// const b3 = Buffer.from([1,2,3,4,5,7])
// console.log(b3.slice(2,5))

// .indexOf: 在buffer中查找数据
// const b4 = Buffer.from('黄攀攀你好')
// console.log(b4.indexOf('攀'))

// .copy: 拷贝buffer中的数据
// const b5 = Buffer.from('copy-info')
// const b6 = Buffer.alloc(10)
// b5.copy(b6)
// b6.fill('1')
// console.log(b5.toString(),b6.toString())

// 静态方法

// Buffer.concat
// const b7 = Buffer.from('黄攀')
// const b8 = Buffer.from('你好')
// const b9 = Buffer.concat([b7,b8])
// console.log(b9.toString())

// Buffer.isBuffer
// console.log(Buffer.isBuffer(b9))

// split 拆分
ArrayBuffer.prototype = function(sep) {
  let start = 0
  let ret = []
  let offset = 0
  let len = Buffer.from(sep).length
  while(offset =this.indexOf(sep,start)!== -1){
    ret.push(this.slice(start,offset))
    start = offset + len
  }
  ret.push(this.slice(start))
  return ret
}
