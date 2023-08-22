const db = require("../db");

const getTasks = (req, res) => {
    const q = "SELECT * FROM tasks";
    db.query(q, (err, data) => {
        if(err) return res.status(500).json({err: err.message});
        return res.status(200).json(data);
    });
}

const getSingleTask = (req, res) => {
    const {id} = req.params;

    const q = "SELECT * FROM tasks WHERE id = ?";

    db.query(q, id, (err, data) => {
        if(err)return res.status(500).json({err: err.message});
        return res.status(200).json(data);
    });
}

const createTask = (req, res) => {
    const {task}  = req.body;
    if(!task) return res.status(404).json("Please provide a task");
    const q = "INSERT INTO tasks (task) VALUES (?)";
    db.query(q, [task], (err, data) => {
        if(err) return res.status(500).json({err: err.message});
        return res.status(201).json("task created!");
    });
}

const updateTask = (req, res) => {
    const {id} = req.params;
    const {task, completed} = req.body;

    if(!task && !completed) return res.status(400).json("Headers cannot be empty");

    const values = [task, completed, id];

    const q1 = "SELECT * FROM tasks WHERE id = ?";
    const q2 = "UPDATE tasks SET task = ?, completed = ? WHERE id = ?";

    db.query(q1, id, (err, data) => {
        if(err) return res.status(500).json({err: err.message});
        if(data.length === 0) return res.status(404).json("Not found, cant update");
        db.query(q2, values, (err) => {
            if(err) return res.status(500).json({err: err.message});
            return res.status(200).json(`UPDATED task with id = ${id}`);
        })
    })
}

const deleteTask = (req, res) => {
    const {id} = req.params;

    const q1 = "SELECT * FROM tasks WHERE id = ?";
    const q2 = "DELETE FROM tasks WHERE id = ?";
    db.query(q1, [id], (err, data) => {
        if(err) return res.status(500).json({err: err.message});
        if(data.length === 0) return res.status(404).json("404 not found!");
        db.query(q2, [id], (err) => {
            if(err) return res.json(500).json({err: err.message});
            return res.json(`DELETED task with ${id}`);
        })
    });
}

module.exports = {getTasks, getSingleTask, createTask, updateTask, deleteTask};