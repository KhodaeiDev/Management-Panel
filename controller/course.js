const courseModel = require("./../model/course");

exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      req.flash("error", "لطفا نام دوره را وارد کنید");
      return res.redirect("/courses");
    }

    const course = await courseModel.findOne({ title });
    if (course) {
      req.flash("error", "نام دوره تکراری است");
      return res.redirect("/courses");
    }

    await courseModel.create({ title });
    req.flash("success", "دوره با موفقیت ایجاد شد");
    return res.redirect("/courses");
  } catch (err) {
    return res.status(500).json("Ooops !!! Unknown Server Error :( ");
  }
};
exports.getAll = async (req, res) => {
  const courses = await courseModel.find({});

  return res.render("course", {
    courses,
    title: "Course Page",
  });
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await courseModel.findOneAndDelete({ _id: id });

    req.flash("success", "دوره با موفقیت حذف شد");
    return res.redirect("/courses");
  } catch (err) {
    return res.status(500).json("Ooops !!! Unknown Server Error :( ");
  }
};
exports.edit = async (req, res) => {
  //
};
