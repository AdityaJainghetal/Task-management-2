const AdminModel = require("../models/adminModel");
const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "aditya";

// Admin Register
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: newAdmin,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, designation, email, password } = req.body;

  try {
    const User = await UserModel.create({
      username: username,
      designation: designation,
      email: email,
      password: password,
    });

    if (User) {
      res.status(200).send({ msg: "New user created" });
    } else {
      res.status(500).send({ mes: "error in server" });
    }
  } catch (error) {
    // console.log(error)
  }
};

const UserDatashow = async (req, res) => {
  const User = await UserModel.find();
  res.status(200).send(User);
};




// const assignTask = async (req, res) => {
//   try {
//     console.log(req.body);

//     const { id, tasktitle, taskdetail, taskduration } = req.body;
//     const Task = await TaskModel.create({
//       tasktitle: tasktitle,
//       taskdetail: taskdetail,
//       taskduration: taskduration,
//       userid: id,
//     });
//     res.status(200).json({ msg: "Task successfully assigned", Task });
//   } catch (error) {
//     console.log(error);
//   }
// };



// const assignTask = async (req, res) => {
//   try {
//     const { id, tasktitle, taskdetail, taskduration } = req.body;

//     // Validate required fields
//     if (!id || !tasktitle) {
//       return res.status(400).json({
//         success: false,
//         error: "User ID and Task title are required fields"
//       });
//     }

//     // Validate MongoDB ID format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid User ID format"
//       });
//     }

//     // Validate task duration if provided
    
  

//     // Create the task
//     const newTask = await TaskModel.create({
//       tasktitle,
//       taskdetail: taskdetail || "", // Default empty string if not provided
//       taskduration: taskduration || "1 week", // Default duration
//       userid: id,
//       status: "Not Started" // Default status
//     });

//     // Populate user details in the response
//     const populatedTask = await TaskModel.findById(newTask._id).populate('userid', 'username email');

//     res.status(201).json({
//       success: true,
//       message: "Task successfully assigned",
//       data: populatedTask
//     });

//   } catch (error) {
//     console.error("Error assigning task:", error);
    
//     // Handle duplicate key errors
//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         error: "Task with similar details already exists"
//       });
//     }

//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(val => val.message);
//       return res.status(400).json({
//         success: false,
//         error: messages
//       });
//     }

//     res.status(500).json({
//       success: false,
//       error: "Server error while assigning task"
//     });
//   }
// };



// const assignTask = async (req, res) => {
//     try {
//         const { 
//             id, 
//             tasktitle, 
//             taskdetail, 
//             taskduration, 
//             priority, 
//             status, 
//             dueDate 
//         } = req.body;

//         // Validate required fields
//         if (!id || !tasktitle) {
//             return res.status(400).json({
//                 success: false,
//                 error: "User ID and Task title are required fields"
//             });
//         }

//         // Validate MongoDB ID format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Invalid User ID format"
//             });
//         }

//         // Check if user exists
//         const userExists = await UserModel.exists({ _id: id });
//         if (!userExists) {
//             return res.status(404).json({
//                 success: false,
//                 error: "User not found"
//             });
//         }

//         // Create the task with all fields
//         const newTask = await TaskModel.create({
//             tasktitle,
//             taskdetail: taskdetail || "",
//             taskduration: taskduration || "1 week",
//             priority: priority || "Medium",
//             status: status || "Not Started",
//             dueDate: dueDate || null,
//             userid: id
//         });

//         // Populate user details in the response
//         const populatedTask = await TaskModel.findById(newTask._id)
//             .populate('userid', 'username email designation')
//             .lean();

//         // Format dates for better readability
//         const formattedTask = {
//             ...populatedTask,
//             createdAt: new Date(populatedTask.createdAt).toLocaleString(),
//             updatedAt: new Date(populatedTask.updatedAt).toLocaleString(),
//             dueDate: populatedTask.dueDate ? new Date(populatedTask.dueDate).toLocaleString() : null
//         };

//         res.status(201).json({
//             success: true,
//             message: "Task successfully assigned",
//             data: formattedTask
//         });

//     } catch (error) {
//         console.error("Error assigning task:", error);
        
//         // Handle duplicate key errors
//         if (error.code === 11000) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Task with similar details already exists"
//             });
//         }

//         // Handle validation errors
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(val => val.message);
//             return res.status(400).json({
//                 success: false,
//                 error: messages.join(", ")
//             });
//         }

//         // Handle cast errors (e.g., invalid date format)
//         if (error.name === 'CastError') {
//             return res.status(400).json({
//                 success: false,
//                 error: `Invalid format for ${error.path}: ${error.value}`
//             });
//         }

//         res.status(500).json({
//             success: false,
//             error: "Server error while assigning task",
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };


const assignTask = async (req, res) => {
    try {
        const { 
            id, 
            tasktitle, 
            taskdetail, 
            taskduration, 
            priority, 
            status, 
            dueDate 
        } = req.body;

        // Validate required fields
        if (!id || !tasktitle) {
            return res.status(400).json({
                success: false,
                error: "User ID and Task title are required fields"
            });
        }

        // Validate MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid User ID format"
            });
        }

        // Get complete user details (excluding password)
        const userDetails = await UserModel.findById(id)
            .select('-password') // Exclude password field
            .lean();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        // Create the task with all fields
        const newTask = await TaskModel.create({
            tasktitle,
            taskdetail: taskdetail || "",
            taskduration: taskduration || "1 week",
            priority: priority || "Medium",
            status: status || "Not Started",
            dueDate: dueDate || null,
            userid: id
        });

        // Format dates for better readability
        const formatDate = (date) => date ? new Date(date).toLocaleString() : null;

        // Prepare response with complete task and user details
        const responseData = {
            task: {
                _id: newTask._id,
                title: newTask.tasktitle,
                detail: newTask.taskdetail,
                duration: newTask.taskduration,
                priority: newTask.priority,
                status: newTask.status,
                dueDate: formatDate(newTask.dueDate),
                createdAt: formatDate(newTask.createdAt),
                updatedAt: formatDate(newTask.updatedAt)
            },
            user: {
                _id: userDetails._id,
                username: userDetails.username,
                email: userDetails.email,
                designation: userDetails.designation,
                // Add any other user fields you want to include
                createdAt: formatDate(userDetails.createdAt),
                updatedAt: formatDate(userDetails.updatedAt)
            }
        };

        res.status(201).json({
            success: true,
            message: "Task successfully assigned",
            data: responseData
        });

    } catch (error) {
        console.error("Error assigning task:", error);
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: "Task with similar details already exists"
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages.join(", ")
            });
        }

        // Handle cast errors (e.g., invalid date format)
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: `Invalid format for ${error.path}: ${error.value}`
            });
        }

        res.status(500).json({
            success: false,
            error: "Server error while assigning task",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Task ID format"
            });
        }

        // Check if task exists
        const existingTask = await TaskModel.findById(id);
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                error: "Task not found"
            });
        }

        // Validate and format user ID if being updated
        if (updateData.userid) {
            // If userid is an object (like from populate), extract the _id
            if (typeof updateData.userid === 'object' && updateData.userid._id) {
                updateData.userid = updateData.userid._id;
            }
            
            if (!mongoose.Types.ObjectId.isValid(updateData.userid)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid User ID format"
                });
            }
        }

        // Update task
        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('userid', '-password');

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask
        });

    } catch (error) {
        handleTaskError(res, error);
    }
};

const DisplayTaskUser = async (req, res) => {
  try {
    const Data = await TaskModel.find().populate("userid");
    res.status(200).send(Data);
  } catch (error) {
    console.log(error);
  }
};

// const DeleteUserTask = async (req, res) => {
//   const { id } = req.body;
//   await TaskModel.findByIdAndDelete(id);

//   res.status(200).send("Task deleted");
// };

const DeleteUserTask = async (req, res) => {
    try {
        const { id } = req.body;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID format"
            });
        }

        // Check if task exists
        const task = await TaskModel.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting task",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Task ID format"
            });
        }

        const task = await TaskModel.findById(id)
            .populate('userid', '-password')
            .lean();

        if (!task) {
            return res.status(404).json({
                success: false,
                error: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        handleTaskError(res, error);
    }
};


module.exports = {
  registerAdmin,
  loginAdmin,
  createUser,
  UserDatashow,
  assignTask,
  DisplayTaskUser,
  DeleteUserTask,
  updateTask,
  getTask
};
