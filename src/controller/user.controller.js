const service = require('../service/user.service')

class UserControlelr{
  async create(ctx,next){
    //获取用户请求的传递参数
    const user = ctx.request.body //对json数据解析得用body-parser
    //查询数据
    const result = await service.create(user)
    
    //返回数据
    ctx.body = result
  }
}

module.exports = new UserControlelr()