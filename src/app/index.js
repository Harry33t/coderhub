const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
//导入userRouter
const userRouter = require('../router/user.router')
//导入handle处理文件
const errorHandler = require('./error-handle')

const app = new Koa()


app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.on('error',errorHandler)


module.exports = app