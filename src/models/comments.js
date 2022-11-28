const { Schema, model } = require("mongoose")

const commentSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: true,
  }
})

module.exports = model("Comment", commentSchema)