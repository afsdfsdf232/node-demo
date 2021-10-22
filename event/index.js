const EventEmitter = require('events')
// .on  添加事件
// .emit 触发事件
// .once 添加首次监听一次的事件
// .off 移除监听的事件

const ev = new EventEmitter()

// on
ev.on('事件1',()=> {
  console.log('事件1执行了')
})
ev.on('事件1',()=> {
  console.log('事件1执行了')
})
// once
ev.once('事件1',()=> {
  console.log('事件1执行了-once')
})
ev.once('事件1',()=> {
  console.log('事件1执行了-once')
})
ev.emit('事件1')
ev.off('事件1',()=>{console.log('off')})
ev.emit('事件1')
