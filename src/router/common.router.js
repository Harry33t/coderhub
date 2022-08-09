const Router = require('koa-router')
const { 
  verifyAuth, 
  verifyPremission 
} = require('../middleware/auth.middleware')

const { 
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')


const commentRouter = new Router({prefix:'/comment'})  //使其符合restfulapi设计

//发表评论
commentRouter.post('/',verifyAuth,create)
//回复评论
commentRouter.post('/:commentId/reply',verifyAuth,reply)
//修改评论
commentRouter.patch('/:commentId',verifyAuth,verifyPremission,update)
//删除评论
commentRouter.delete('/:commentId',verifyAuth,verifyPremission,remove)
//获取评论列表
commentRouter.get('/',list)

module.exports = commentRouter
