const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String },
  image: { type: String },
  createdAt: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Post", postSchema);
