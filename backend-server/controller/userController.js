import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const { email } = newUser;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already Exists" });
    }

    const savedData = await newUser.save();
    // res.status(200).json(savedData);
    res.status(200).json({ message: "User Successfully Created" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const allUser = async (req, res) => {
  try {
    const users = await userModel.find();
    // console.log(users);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User data not found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User data not found." });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User data not found." });
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {}
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if (!userExist) {
      return res.status(400).json({ message: "User not Found" });
    }
    const deletedUser = await userModel.findByIdAndDelete(id);
    res
      .status(200)
      .json(deletedUser, { message: "User Deleated Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
