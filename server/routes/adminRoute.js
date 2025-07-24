const express = require("express");
const route = express.Router();
const adminController = require("../controllers/adminController");

route.post("/adminlogin", adminController.loginAdmin);
route.post("/registeradmin", adminController.registerAdmin);

route.post("/createuser", adminController.createUser);
route.get("/userdatashow", adminController.UserDatashow);
route.post("/assigntask", adminController.assignTask);

route.get("/displaytaskuser", adminController.DisplayTaskUser);

route.delete("/deleteusertask", adminController.DeleteUserTask);
route.get('/tasks/:id', adminController.getTask);
route.put('/updatetask/:id', adminController.updateTask);




module.exports = route;
