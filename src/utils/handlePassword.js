const bcryptjs = require("bcryptjs")

const hashPassword = async (password) => await bcryptjs.hash(password, 10)

const comparePassword = async (password, hashedPassword) => await bcryptjs.compare(password, hashedPassword)

module.exports = {
  hashPassword,
  comparePassword
}