const userModel = require("../models/user")
const { comparePassword, hashPassword } = require("../utils/handlePassword")

const login = (req, res) => {
  userModel.findOne({ email: req.body.email })
    .then(async user => {
      if (user) {
        const result = await comparePassword(req.body.password, user.password)
        if (result) res.status(200).json({
          id: user._id,
          username: user.username
        })
        else res.status(400).end()
      } else {
        res.status(401).end()
      }
    })
}

const signup = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password)
  userModel.create({ ...req.body, password: hashedPassword })
    .then(({ username, email, _id }) => res.status(201).json({ id: _id, username, email }))
    .catch(e => {
      res.status(409).end()
    })
}

module.exports = {
  login,
  signup
}