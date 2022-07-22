const verifyUser = async(ctx,next) => {
  const {name,password} = ctx.request.body
  if(!name || !password || name === '' || password === ''){
    const error = new Error('用户名或者密码不能为空')
    return ctx.app.emit('error',error,ctx) //发射错误信息
  }

  //判断这次的用户名是没有被注册的.


  await next() //
}

module.exports = {
  verifyUser
}