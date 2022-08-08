const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')

const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const verifyLogin = async(ctx,next) =>{

  let {name,password} = ctx.request.body
  //判断用户名和密码是否为空
  if(!name||!password){
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error',error,ctx) //弹出错误
  }
  
  //判断用户是否存在
  const result = await userService.getUserByName(name)
  const [user] = result
  if(!user){
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error',error,ctx)
  }
  
  //判断密码是否与登录密码一致
  if(md5password(password)!== user.password){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error',error,ctx)
  }
  ctx.user = user //方便操作
  

  await next()
}

const verifyAuth = async(ctx,next) => {
  console.log('验证授权的middleware~');

  //1.获取token
  const authorization = ctx.headers.authorization
  
  if(!authorization){
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error',error,ctx)
  }

  const token = authorization.replace('Bearer ','')
  
  //2.验证token
  try {
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithms:["RS256"]
    })
    ctx.user = result
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error',error,ctx)
  }
  await next();
}

const verifyPremission = async (ctx,next) => {
  console.log('验证权限的middleware,premission~');

  //1.获取参数
  const {momentId} = ctx.params
  const {id} = ctx.user

  const isPremission = await authService.checkMoment(momentId,id)

  if(!isPremission){
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error',error,ctx)
  }
  await next();

}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPremission
}
