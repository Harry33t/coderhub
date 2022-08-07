const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require("../utils/password-handle")


const verifyUser = async(ctx,next) => {
  const {name,password} = ctx.request.body
  if(!name || !password || name === '' || password === ''){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx) //发射错误信息
  }

  //判断这次的用户名是没有被注册的.
  const result = await userService.getUserByName(name)
  // console.log(result.length);
  if(result.length){ //如果!=0 证明数据库里已经有数据了
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error',error,ctx)
  }
  await next() 
}

const hadnlePassword = async (ctx,next) => {
  let {password} = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  hadnlePassword
}