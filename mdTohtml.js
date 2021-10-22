const fs = require('fs')
const path = require('path')
const marked = require('marked')
const browserSync = require('browser-sync')
let mdPath = path.join(__dirname,'/index.md')
let cssPath = path.resolve('test.css')
let htmlPath =mdPath.replace(path.extname(mdPath),'.html')

fs.readFile(mdPath,'utf-8',(err,data)=> {
  if (err) throw Error(err)
  const htmlStr = marked(data)
  fs.readFile(cssPath,'utf-8',(err,data)=> {
    if (err) throw Error(err)
    const retHtml = temp.replace('{{content}}',htmlStr).replace('{{style}}',data)
    fs.writeFile(htmlPath,retHtml,(err,data)=> {
      if (err) throw Error(err)
      browserSync.init({
        browser:'',
        server: __dirname,
        watch: true,
        index: path.basename(htmlPath)
      })
    })
  })
})
fs.watchFile(mdPath,(curr,prev)=> {
  if (curr.atime !== prev.atime){
    fs.readFile(mdPath,'utf-8',(err,data)=> {
      if (err) throw Error(err)
      const htmlStr = marked(data)
      fs.readFile(cssPath,'utf-8',(err,data)=> {
        if (err) throw Error(err)
        const retHtml = temp.replace('{{content}}',htmlStr).replace('{{style}}',data)
        fs.writeFile(htmlPath,retHtml,(err,data)=> {
          if (err) throw Error(err)
          browserSync.init({
            browser:'',
            server: __dirname,
            watch: true,
            index: path.basename(htmlPath)
          })
        })
      })
    })
  }
})
const temp = `
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style>{{style}}</style>
</head>
<body>
<div>
  <h1 style="color:red">hahahah</h1>
  <div>{{content}}</div>
</div>
</body>
</html>`
