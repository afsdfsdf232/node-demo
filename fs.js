const fs = require('fs')
const path = require('path')

// fs.readFile  读取文件数据
// fs.readFile(path.join(__dirname,'/data.txt'),'utf-8',(err,data)=> {
//   if (err) console.log(err)
//   console.log('data:',data)
// })

// fs.writeFile 向指定文件写入数据,默认会覆盖源文件数据，路径不存在会创建
// fs.writeFile(path.join(__dirname,'/data.txt'),'hello word 黄攀 这是我写入的数据，看见了吗',{
//   mode: 438,
//   flag:'r+',
//   encoding:'utf-8'
// },(err,data)=> {
//   console.log('data:',data,err)
// })

// fs.appendFile 向指定文件追加数据
// fs.appendFile(path.join(__dirname,'/data.txt'),',我是追加的数据1',(err)=>{
//   console.log('err:',err)
// })


// fs.copyFile   将某个文件数据拷贝至另一个文件
// fs.copyFile('./package-lock.json','./data2.txt',(err)=> {
//   console.log('err:',err)
// })


// fs.watchFile  对指定文件内容进行监听
// fs.watchFile('./fs.js',{interval: 10},(cuur,prev)=>{
//   if(cuur.mtime !== prev.mtime){
//     console.log('内容改变了')
//   }
//   fs.unwatchFile('./fs.js') // 取消监控
// })

// 文件的打开和关闭 open close
// open
// fs.open(path.resolve('package-lock.json'),'r',(err,fd)=> {
//   console.log('fd:',fd)
// })
// close
// fs.open(path.resolve('package-lock.json'),'r',(err,fd)=> {
//   fs.close(fd, err => {
//     console.log(err)
//   })
// })



// read 所谓的读操作就是将磁盘数据从磁盘文件中写到buffer中
// let buf = Buffer.alloc(10)

/**
 * fd: 定位当前所打开的文件
 * buf：用于表示当存文件的缓冲区
 * offset: 表示当前从buf的那个位置开始执行写入
 * length: 表示当前次写入的长度
 * position：表示从当前文件的那个位置开始读取
 * */ 
// fs.open('./package-lock.json','r',(err,rfd)=> {
//   fs.read(rfd,buf,1,9,3,(err,readBytest,data)=>{
//     console.log(readBytest,data)
//     console.log(data.toString())
//   })
// })

// write 将缓冲区内容写到文件中
// const buf = Buffer.from('1234567890')
// fs.open('./data.txt','w',(err,wfd)=> {
//   // 文件，缓冲区，offset：从缓冲区那个位置写，长度，开始位置
//   fs.write(wfd,buf,0,3,1,(err,written,b)=> {
//     console.log(written,b, b.toString())
//     fs.close(wfd,()=>{})
//   })
// })

// 文件拷贝
/**
 * 01 打开 a 文件，利用 read 将文件放在buffer 暂存起来
 * 02 打开 b 文件，利用 write 将buffer中的数据写到 b 文件中
 * */ 

// 文件全部拷贝
// const buf = Buffer.alloc(10)
// const BUFFER_SIZE = buf.size;
// const readOffset = 0;
// fs.open('a.txt','r',(err,rfd)=> {
//   fs.open('b.txt','w',(err,wfd)=> {
//     function next() {
//       fs.read(rfd,buf,0,BUFFER_SIZE,readOffset,(err,readBytes)=> {
//         if (!readBytes) {
//           // 说明内容一起读取完毕
//           fs.close(rfd,()=>{})
//           fs.close(wfd,()=>{})
//           console.log('拷贝完成')
//           return
//         }
//         readOffset+= readBytes
//         fs.write(wfd,buf,0,readBytes,(err,written)=> {
//           next()
//         })
//       })
//     }
//     next()
//   })
// })


// 目录操作
// access: 判断文件或者目录是否具有操作权限
// stat：获取目录及文件信息
// mkdir： 创建目录
// rmdir：删除目录
// readdir：读取目录中的内容
// unlink：删除指定文件

// fs.access('./package-lock.json',(err)=> {
//   if (err) {
//     console.log('没有操作权限：',err)
//   } else { 
//     console.log('有操作权限')
//   }
// })

// fs.stat('./package-lock.json',(err,fileObject)=> {
//   console.log(fileObject.size) // 文件目录大小
//   console.log(fileObject.isFile()) // 是不是文件
//   console.log(fileObject.isDirectory()) // 是不是目录
// })

// fs.mkdir('a/b/c',(err)=> {
//   // 必须保证父级目录存在，当前如果没有a/b目录会失败
//   if (err) console.log('创建失败')
//   else console.log('创建成功')
// })

// fs.mkdir('a/b/c',{recursive: true},(err)=> {
//   // recursive 递归创建目录
//   if (err) console.log('创建失败')
//   else console.log('创建成功')
// })
// recursive: true 删除非空目录和递归删除
// fs.rmdir('./b',{recursive: true},(err)=> {})

// 读取目录
// fs.readdir('./',{recursive: true},(err,data)=> {
//   console.log('data:',data)
// })

// fs.unlink('./b/c/index.txt',(err,data)=> {
//   console.log(data,err)
// })
