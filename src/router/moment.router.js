const Router = require('koa-router')

const momentRouter = new Router({prefix:'/moment'})

const {
  create,
  detail,
  list,
  update,
  remove
} = require('../controller/moment.controller')

const {
  verifyAuth,
  verifyPremission
} = require('../middleware/auth.middleware')


momentRouter.post('/',verifyAuth,create) //动态
momentRouter.get('/:momentId',detail) //查看某一个动态
momentRouter.get('/',list) //查询多条评论


//1.用户必须登录 2.用户必须具备权限
momentRouter.patch('/:momentId',verifyAuth,verifyPremission,update)

//删除评论
momentRouter.delete('/:momentId',verifyAuth,verifyPremission,remove)


module.exports = momentRouter