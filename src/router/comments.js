const { getComments, addComment, deleteComment, updateComment } = require("../controllers/comments.controller")

const Router = require("express").Router()

Router.get("/", getComments)
Router.post("/", addComment)
Router.delete("/:id", deleteComment)
Router.put("/:id", updateComment)

module.exports = Router