'use strict';

const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')

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