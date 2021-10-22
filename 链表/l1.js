/**
 * 01 node + head + null
 * 02 head --> null
 * 03 size 个数
 * 04 next 指向下一个节点 element 存放该节点数据
 * 05 增加节点 删除节点 查找节点 修改节点 清空节点
 * */ 

class Node {
  constructor(element,next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor(head,size) {
    this.head = null
    this.size = 0
  }
  _getNode(index) {
    if (index<0 || index>=this.size) {
      throw new Error('越界了')
    }
    let currentNode = this.head;
    for(let i=0; i<index; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  add (index,element) {
    if (arguments.length === 1) {
      element = index;
      index = this.size
    }
    if (index<0 || index> this.size) {
      throw new Error('越界了')
    }
    if (index === 0) {
      let head = this.head
      this.head = new Node(element,head)
    } else {
      let prevNode = this._getNode(index-1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }
  remove(index){
    if (index === 0) {
      let head = this.head;
      this.head = head.next
    } else {
      let prevNode = this._getNode(index-1)
      prevNode.next = prevNode.next.next
    }
    this.size --
  }
  set(index, element){
    let node = this._getNode(index);
    node.element = element
  }
  get(index){
    return this._getNode(index)
  }
  clear(){
    this.head = null
    this.size = 0
  }
}

const l1 = new LinkedList()
l1.add('node')
l1.add('node2')
l1.add('node3')
l1.remove(1)
// l1.clear()
console.log('l1:', l1)
