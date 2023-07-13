const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userShema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      validate: { unique: true, match: /.+\@.+\..+/ },
    },
    thoughts: [thoughtSchema],
    friends: [userShema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userShema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userShema);

module.exports = User;
