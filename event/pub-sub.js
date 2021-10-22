// 发布订阅
class PubSub {
  constructor(){
    this._events = {}
  }
  // 注册
  subscribe(event, callback){
    if (this._events[event]) {
      // 如果当前event存在，只需要添加当前监听函数
      this._events[event].push[callback]
    } else {
      // 添加订阅事件
      this._events[event] = [callback]
    }
  }
  
  // 发布
  publish(event, ...args) {
    const items = this._events[event]
    if (items && items.length) {
      items.forEach( callback => {
        callback.call(this, ...args)
      })
    }
  }
}
