const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task.model")
const tasks = [];
const app = express();
mongoose.connect("mongodb://localhost:27017/ToDoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connectet to db");
    }
})
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const taskList = await Task.find()
        // console.log(taskList)
        res.render("index", {
            tasks: taskList,
            i: 0
        });
    } catch (error) {
        console.log(error)
    }

})
app.post("/addTask", (req, res) => {
    // req.body.inputTask != "" ? tasks.push(req.body.inputTask) : null
    if (req.body.inputTask != "") {
        const newTask = new Task({
            title: req.body.inputTask
        }).save((err) => {
            if (err)
                console.log(err)
        })
    }
    res.redirect("/");
})
app.post("/completeTask/:id", async (req, res) => {
    try {
        await Task.updateOne({
            _id: req.params.id
        }, {
            $set: {
                status: true
            }
        })
    } catch (error) {
        console.log(error)
    }
    res.redirect("/");
})
app.post("/deleteTask/:id", async (req, res) => {
    try {
        await Task.deleteOne({
            _id: req.params.id
        })
    } catch (error) {
        console.log(error)
    }
    res.redirect("/");
})
app.listen("3000", () => {
    console.log("listening to port 3000");
})