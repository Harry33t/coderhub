const fs = require('fs')

const userRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(file => {  //读取当前文件所在的目录,返回数组
    if(file === 'index.js') return;
    const router = require(`./${file}`) //动态遍历文件
    app.use(router.routes())
    app.use(router.allowedMethods())
    
  })
}

module.exports = userRoutes