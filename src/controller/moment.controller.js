const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx,next){
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const result = await momentService.create(userId,content)
    ctx.body = result;
  }

  async detail(ctx,next){
    const momentId = ctx.params.momentId
    const [result] = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx,next){
    //1.获取(offset/size)
    const {offset,size} = ctx.query
    //2.查询列表
    const result = await momentService.getMomentList(offset,size)
    ctx.body = result;
  }

  async update(ctx,next){
    
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }


  async remove(ctx,next){
    //1.获取momentId
    const {momentId} = ctx.params

    const result = await momentService.remove(momentId)

    ctx.body = result
  }
}

module.exports = new MomentController()