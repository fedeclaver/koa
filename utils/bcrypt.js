
const bcrypt = require("bcrypt");


export const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export const isValidPassword = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword)
}
