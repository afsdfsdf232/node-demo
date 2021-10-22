const { 
  basename, 
  dirname, 
  extname, 
  isAbsolute, 
  join, 
  resolve, 
  parse, 
  format, 
  normalize 
} = require('path')
// basename   获取路径中的基础名称,如果是目录则返回最后一个目录
// console.log(basename('./package.json')) //package.json
// console.log(basename('./abc','js')) //abc

// dirname    获取路径中的目录名称
// console.log(dirname(__filename)) // D:\demo\node\node-api-d1
// console.log(dirname('a/b/c/')) // a/b

// extname    获取路径中的扩展名称
// console.log(extname(__filename)) // .js
// console.log(extname('a/b/c')) //''

// isAbsolute 获取路径是否为绝对路径
// console.log(isAbsolute('a/b/c')) // false
// console.log(isAbsolute('/a/b/c')) // true

// join       拼接多个路径片段
// console.log(join(__dirname,'index.js')) // D:\demo\node\node-api-d1\index.js

// resolve    返回绝对路径   
// console.log(resolve()) // D:\demo\node\node-api-d1
// console.log(resolve('path.js')) // D:\demo\node\node-api-d1\path.js


// parse      解析路径
// console.log(parse('/a/b/c/index.html'))


// format     序列化路径
// console.log(format({ // /a/b/c\index.html
//   root: '/',
//   dir: '/a/b/c',
//   base: 'index.html',
//   ext: '.html',
//   name: 'index'
// }))
// normalize  规范化路径

