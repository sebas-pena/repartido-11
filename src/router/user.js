const { signup, login } = require("../controllers/users.controller")

const Router = require("express").Router()

Router.post("/register", signup)
Router.post("/login", login)

module.exports = Router