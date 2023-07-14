const { Thought, User, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const filter = { username: req.body.username };
      const update = { $push: { thoughts: thought._id.toString() } };
      const user = await User.findOneAndUpdate(filter, update);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const filter = { _id: req.params.thoughtId };
      const thought = await Thought.findOne(filter);
      const newThoughtArray = thought.reactions.filter((reaction) => {
        if (reaction.reactionId?.toString() === req.body.reactionId) {
          return false;
        }
        return true;
      });
      const updatedThought = await Thought.findOneAndUpdate(filter, {
        reactions: newThoughtArray,
      });
      console.log(newThoughtArray);
      console.log(thought.reactions);
      res.json({ message: "Reaction has been deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const myReaction = new Reaction(req.body);
      console.log(myReaction);
      const filter = { _id: req.params.thoughtId };
      const update = { $push: { reactions: myReaction } };
      const thought = await Thought.findOneAndUpdate(filter, update);
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
