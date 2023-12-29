const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080;

const DB = "mongodb+srv://crud-app:12345@cluster0.w7h8loc.mongodb.net/";
mongoose.connect(DB).then(() => {
    console.log("Connected to Database")
}).catch((err) => {
    console.log("Connection failed")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number
}, {
    timestamps: true
})

const userModel = mongoose.model("users", userSchema)


// READ
app.get("/", async (req, res) => {
    const data = await userModel.find();
    try {
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

// CREATE 
app.post("/create", async (req, res) => {
    console.log(req.body)
    res.status(200).json({
        status: "success",
        message: "Data received"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
