import express from "express";
const app = express();
app.listen(8080,()=> {
  console.log('服务开启')
})
console.log(__dirname,__filename)
