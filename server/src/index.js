const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://root:secret@mongo:27017/products?authSource=admin');
const Notes = mongoose.model('Notes', { notes: String, date: String });

app.get("/", (req, res) => {
    res.json({ message: "Hello From Docker Tutorial!" })
})

app.get("/get-notes", async (req,res) => {
    try {
        const data = await Notes.find();
        res.json(data);
    } catch (error) {
        console.log(error)
    }
})

app.post("/add", async (req, res) => {
    try {
        const { text } = req.body
        const notes = new Notes({ notes: text, date: new Date() });
        await notes.save();
        res.json("Notes added!");
    } catch (error) {
        console.log(error)
    }
})

app.listen(9000, () => {
    console.log("Server started!")
})