const commentsModel = require("../models/comments")

const getComments = (req, res) => {
  commentsModel.find().populate("uid").then(comments => res.json(comments))
}

const addComment = (req, res) => {
  commentsModel.create(req.body).then(doc => {
    res.status(201).json(doc)
  }).catch(e => {
    res.status(500).send("INTERNAL SERVER ERROR")
  })
}

const deleteComment = (req, res) => {
  commentsModel.deleteOne({
    _id: req.params.id
  })
    .then(() => {
      res.status(200).end()
    })
    .catch(e => console.log(e))
}

const updateComment = (req, res) => {
  commentsModel.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: {
      content: req.body.content
    }
  }).then(() => {
    res.status(200).end()
  })
}

module.exports = {
  getComments,
  addComment,
  deleteComment,
  updateComment
}