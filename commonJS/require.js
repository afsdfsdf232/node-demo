const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id;
  this.exports = {}
}
Module.wrapper = ["(function (exports,require,__filename,__dirname) {","})"]
Module._extensions = {
  '.js'(module) { 
    console.log('module:',module)
    // 读取
    let content = fs.readFileSync(module.id,'utf-8')

    // 包装
    content = Module.wrapper[0] + content + Module.wrapper[1]
    
    // vm
    const compileFn = vm.runInThisContext(content);
    
    let exports = module.exports
    let dirname = path.dirname(module.id)
    let filename = module.id
    
    // 调用
    compileFn.call(exports, exports, myRequire, module, filename, dirname)
    
  },
  '.json'() { }
}
Module._resolveFilename = function (filename) {

  // 利用 path 将filename转为绝对路径
  const absPath = path.resolve(__dirname, filename)
  // 判断当前路径对应的内容
  if (fs.existsSync(absPath)) {
    return absPath
  } else {
    // 不存在,补足后缀
    const suffix = Object.keys(Module._extensions)
    for(let i=0; i<suffix.length; i++) {
      let newPath = absPath + suffix[i]
      if (fs.existsSync(newPath)) {
        return newPath
      }
    }
    throw new Error(`${filename} is not exists`)
  }
}
Module._cache = {}
Module.prototype.load = function () {
  const extname = path.extname(this.id)
  Module._extensions[extname](this)
}
function myRequire(filename) {

  // 1 获取绝对路径
  const mPath = Module._resolveFilename(filename)

  // 2缓存优先
  const cacheModule = Module._cache[mPath]
  if (cacheModule) return cacheModule.exports;

  // 创建空对象，加载目标模块
  const module = new Module(mPath);
  Module._cache[mPath] = module
  
  // 执行加载 编译执行
  module.load()
  return module.exports
}
const obj = myRequire('./v1')
console.log('obj:', obj)
