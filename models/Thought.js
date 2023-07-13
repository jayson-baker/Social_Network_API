const { Schema, model } = require("mongoose");
const reationSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: { type: String, required: true },
    reations: [reationSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reationCount").get(function () {
  return this.reations.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
