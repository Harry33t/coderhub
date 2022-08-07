const connection = require('../app/database');
class userService{
  async create(user){

    const {name,password} = user
    
    const statement =  `INSERT INTO users(name,password) VALUES(?,?)`
    const [result] = await connection.execute(statement,[name,password])
    
    
    return result
  }
  async getUserByName(name){

    const statement =  `SELECT * FROM users WHERE name = ?;`
    const [result] = await connection.execute(statement,[name])
    return result


  }

}

module.exports = new userService()