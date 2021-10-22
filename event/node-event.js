function Event () {
  // 准备一个数据结构缓存订阅信息
  this._event = Object.create(null)
}
Event.prototype.on = function (type,callback) {
  // 判断当前次的事件是否已经存在
  if (this._event[type]) {
    this._event[type].push(callback)
  } else {
    this._event[type] = [callback]
  }
}

Event.prototype.emit = function (type, ...args) {
  if (this._event && this._event[type].length) {
    this._event[type].forEach(callback => {
      callback.call(this, ...args)
    });
  }
}

Event.prototype.off = function (type, callback) {
  // 判断是否存在，是-> 移除
  if (this._event && this._event[type]) {
    this._event[type] = this._event[type].filter( item => item !== callback);
    
  }
}
Event.prototype.once = function (type, callback) {
  const foo = function (...args) {
    callback.call(this, ...args)
    this.off(type, foo)
  }
  this.on(type, foo)
}
const ev = new Event();
const fn = data => console.log('事件1执行了:'+data.name)
ev.on('事件1', fn)
ev.off('事件1', fn)
ev.on('事件1', fn)
ev.emit('事件1',{name:'hp'})
