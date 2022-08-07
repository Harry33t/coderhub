const Router = require('koa-router')
const userRouter = new Router({prefix:'/users'})

const { 
  create 
} = require('../controller/user.controller')

const {
  verifyUser,
  hadnlePassword
} = require('../middleware/user.middleware')


userRouter.post('/',verifyUser,hadnlePassword,create)

module.exports = userRouter
