const courseModel = require("./../model/course");

exports.create = async (req, res) => {
  //
};
exports.getAll = async (req, res) => {
  res.render("index", {
    courses: [],
    title: "Course Page",
  });
};
exports.remove = async (req, res) => {
  //
};
exports.edit = async (req, res) => {
  //
};
