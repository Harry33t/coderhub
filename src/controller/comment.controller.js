const commentService = require('../service/comment.service')

class CommentController{
  async create(ctx,next){
    const {momentId,content} = ctx.request.body
    const {id} = ctx.user
    console.log(momentId,content,id);
    const result = await commentService.create(momentId,content,id)

    ctx.body = result
  }

  async reply(ctx,next){
    
  }
}


module.exports = new CommentController()