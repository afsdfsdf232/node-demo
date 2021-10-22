const fs = require('fs');
const rs = fs.createReadStream('./../package-lock.json')
const ws = fs.createWriteStream('./../package-lock1.txt')

rs.pipe(ws)
