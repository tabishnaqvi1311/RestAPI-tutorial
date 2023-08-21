const express = require("express");
const router = express.Router();

const { getTasks, getSingleTask, createTask, updateTask, deleteTask } = require("../controllers/taskController");

router.get("/getTasks", getTasks);

router.get("/getSingleTask/:id", getSingleTask);

router.post("/createTask", createTask);

router.put("/updateTask/:id", updateTask);

router.delete("/deleteTask/:id", deleteTask);

module.exports = router;