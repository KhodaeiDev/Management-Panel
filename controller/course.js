const courseModel = require("./../model/course");
const { validationResult } = require("express-validator");

exports.create = async (req, res, next) => {
  try {
    const { title } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      req.flash("error", result.errors[0].msg);
      return res.redirect("/courses");
    }
    if (!req.file) {
      req.flash("error", "Course Image is a require field");
      return res.status(403).redirect("/courses");
    }

    const course = await courseModel.findOne({ title });
    if (course) {
      req.flash("error", "نام دوره تکراری است");
      return res.redirect("/courses");
    }

    const courseImageUrl = `/images/courses/${req.file.filename}`;
    await courseModel.create({
      title,
      image: {
        path: courseImageUrl,
        filename: req.file.filename,
      },
    });
    req.flash("success", "دوره با موفقیت ایجاد شد");
    return res.redirect("/courses");
  } catch (err) {
    next(err);
  }
};
exports.getAll = async (req, res) => {
  const courses = await courseModel.find({});

  return res.render("course", {
    courses,
    title: "Course Page",
  });
};
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await courseModel.findOneAndDelete({ _id: id });

    req.flash("success", "دوره با موفقیت حذف شد");
    return res.redirect("/courses");
  } catch (err) {
    next(err);
  }
};
exports.edit = async (req, res, next) => {
  //
};
