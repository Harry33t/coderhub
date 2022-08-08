const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
//导入userRouter
const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
//导入handle处理文件
const errorHandler = require('./error-handle')
const userRoutes = require('../router')

const app = new Koa()


app.use(bodyParser())

userRoutes(app)

app.on('error',errorHandler)


module.exports = app