const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      path: { type: String, required: true },
      filename: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Course", schema);

module.exports = model;
