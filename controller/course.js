const courseModel = require("./../model/course");

exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "لطفا نام دوره را وارد کنید" });
    }

    await courseModel.create({ title });
    return res.redirect("/courses");
  } catch (err) {
    return res.status(500).json("Ooops !!! Unknown Server Error :( ");
  }
};
exports.getAll = async (req, res) => {
  const courses = await courseModel.find({});

  res.render("index", {
    courses,
    title: "Course Page",
  });
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await courseModel.findOneAndDelete({ _id: id });
    return res.redirect("/courses");
  } catch (err) {
    return res.status(500).json("Ooops !!! Unknown Server Error :( ");
  }
};
exports.edit = async (req, res) => {
  //
};
