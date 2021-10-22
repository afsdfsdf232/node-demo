const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
/**
 * 接收参数 a/b/c
 * 利用分隔符将路径拆分，将每项放入数组管理 ['a','b','c']
 * 遍历数据，拿到每项与前一项拼接 /
 * 判断当前拼接后路径是否存在，否则要创建，递归创建
 * */
// function makeDirSync (dirPath) {
//   // path.sep 获取当前系统的路径分隔符
//   const items = dirPath.split(path.sep)
//   for(let i=1; i<items.length; i++){
//     let dir = items.slice(0,i).join(path.sep)
//     try {
//       fs.accessSync(dir)
//     } catch(err) {
//       fs.mkdirSync(dir)
//     }
//   }
//   console.log(items)
// }
// makeDirSync('a\\b\\c\\')

// 异步创建文件 next
// function makeDir(dirPath, cb) {
//   let parts = dirPath.split('/')
//   let index = 1
//   function next() {
//     if (index > parts.length) return cb && cb();
//     let current = parts.slice(0, index++).join('/')
//     fs.access(current,err => {
//       if (err) {
//         fs.mkdir(current, next)
//       } else {
//         next()
//       }
//     })
//   }
//   next()
// }
// makeDir('a/b/c/d/e/f/g')

// 利用promise方式
// const access = promisify(fs.access)
// const mkdir = promisify(fs.mkdir)

// async function myMkdir (dirPath,cb) {
//   let parts = dirPath.split('/')
//   for(let index = 1; index<parts.length; index++){
//     let current = parts.slice(0,index).join('/')
//     try {
//       await access(current)
//     } catch(err) {
//       await mkdir(current)
//     }
//   }
//   cb && cb()
// }

// myMkdir('a/b/c/',()=> console.log('创建成功'))


/**
 * 自定义一个函数，接收一个路径或者目录，然后执行删除
 * 判断当前传入是目录还是文件，执行删除当前的文件或者目录
 * 如果是目录，继续执行目录的内容，然后执行删除
 * 
 * */ 
function myRmdir(dirPath, cb) {
  // 判断当前dirPath类型
  fs.stat(dirPath,(err,statObj)=> {
    if (statObj.isDirectory()){
      // 目录
      fs.readdir(dirPath,(err,files)=> {
        // 拼接路径
        const dirs = files.map( item => path.join(dirPath,item))
        let index = 0
        function next () {
          if (index=== dirs.length) {
            fs.rmdir(dirPath,cb)
            return;
          } else {
            let current = dirs[index++]
            myRmdir(current,next)
          }
        }
        next()
      })
    } else {
      // 文件
      fs.unlink(dirPath,cb)
    }
  })
}
myRmdir('./node_modules/',()=> console.log('删除成功'))
