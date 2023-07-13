const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userShema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return /.+\@.+\..+/.test(v);
        },
        message: (v) => `${v.value} is not a valid email.`,
      },
    },
    thoughts: { type: Array },
    friends: [this],
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

userShema.post("findOneAndDelete", async (data) => {
  console.log(JSON.stringify(data));
});

const User = model("user", userShema);

module.exports = User;
