const { Schema, Types, model } = require("mongoose");

const reationSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: new Types.ObjectId() },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reaction = model("reaction", reationSchema);

module.exports = Reaction;
