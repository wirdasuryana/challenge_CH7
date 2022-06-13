'use strict';

const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') // tambahan jwt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  //   generateToken = () => {
  //     const payload = {
  //       id: this.id,
  //       username: this.username
  //     }

  //     const rahasia = 'Ini rahasia gak boleh di sebar-sebar'

  //     const token = jwt.sign(payload, rahasia)
  //     return token
     
  // }

    static #encrypt(password) {
      return bcrypt.hashSync(password, 10)
    }
   
    static register = ({username, password}) => {
      const encryptedPassword = this.#encrypt(password)
      
      return this.create({ username: username, password: encryptedPassword})
    }
    
    checkPassword = password => {
      return bcrypt.compareSync(password, this.password)
    }

    static authenticate = async ({ username,password}) => {
      try{
        const user = await this.findOne({ where: {username}})
        if(!user) {
          return Promise.reject({message: "User Not Found!!"})
        }

        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) {
          Promise.reject({message: "Wrong Password"})
        }

        return Promise.resolve(user)
        }catch(err) {
        return Promise.reject(err)
      }
    }
    //tambahan jwt
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }

      const rahasia = 'Ini rahasia gak boleh di sebar-sebar'

      const token = jwt.sign(payload, rahasia)
      return token

    }
    //sampai sini
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};