const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoSchema = require("./model.js");
const cors = require("cors");
const { async } = require("rxjs");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://santosh:Nehitha@cluster0.iwqqdfo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db connected"));

app.post("/data", async (req, res) => {
  const { todo } = req.body;
  try {
    const dot = new TodoSchema({ todo });

    await dot.save();

    return res.json(await TodoSchema.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/read", async (req, res) => {
  try {
    const alldata = await TodoSchema.find();
    return res.send(alldata);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await TodoSchema.findByIdAndDelete(req.params.id);

    return res.json(await TodoSchema.find());
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/deleteall", async (req, res) => {
  try {
    await TodoSchema.deleteMany(req.params.id);
    return res.json(await TodoSchema.deleteMany());
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(8000, console.log("server rendring..."));
