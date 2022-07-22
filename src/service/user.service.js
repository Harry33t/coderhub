const connection = require('../app/database');
class userService{
  async create(user){
    //解构
    const {name,password} = user
    
    const statement =  `INSERT INTO users(name,password) VALUES(?,?)`
    const result = await connection.execute(statement,[name,password])
    
    
    return result
  }
}

module.exports = new userService()