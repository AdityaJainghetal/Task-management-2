const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      res.status(400).send({ msg: "Invalid user email" });
    }

    if (User.password != password) {
      res.status(400).send({ msg: "Invalid password" });
    }

    res.status(200).send(User);
  } catch (error) {
    console.log(error);
  }
};

const userTaskDisplay = async (req, res) => {
  const { id } = req.query;

  try {
    const Task = await TaskModel.find({ userid: id });
    res.status(200).send(Task);
  } catch (error) {
    console.log(error);
  }
};

const taskStatusChange = async (req, res) => {
  console.log(req.body);

  const { id } = req.body;

  try {
    const Task = await TaskModel.findByIdAndUpdate(id, { status: "Complete" });
    res.status(200).send("Okk");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userLogin,
  userTaskDisplay,
  taskStatusChange,
};
