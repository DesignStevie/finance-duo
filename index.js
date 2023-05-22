import mongoose from "mongoose";
import ExpenseModel from "./Models/Expenses.js";
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cors from 'cors'
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
  origin: 'https://finance-duo-designstevie.vercel.app/',
}));

mongoose.connect(process.env.MONGODB_LINK);

app.get("/api/test", (req, res) => {
  res.send("test");
});

app.get("/api/getExpenses", async (req, res) => {
  const allExpenses = await ExpenseModel.find({});
  res.send(allExpenses);
});

app.post("/api/addExpense", async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const date = req.body.date;
  const amount = req.body.amount;

  const newExpense = new ExpenseModel({
    name: name,
    type: type,
    date: date,
    amount: amount,
  });
  await newExpense.save();

  res.send(newExpense);
});

app.delete("/api/removeExpense/:id", async (req, res) => {
  await ExpenseModel.findByIdAndRemove(req.params.id).exec();
  res.send("Expense Deleted");
});

app.put("/api/updateExpense", async (req, res) => {
  const newName = req.body.newName;
  const newType = req.body.newType;
  const newDate = req.body.newDate;
  const newAmount = req.body.newAmount;
  const id = req.body.id;

  try {
    const expenseToUpdate = await ExpenseModel.findById(id);
    expenseToUpdate.name = newName;
    expenseToUpdate.type = newType;
    expenseToUpdate.date = newDate;
    expenseToUpdate.amount = newAmount;
    await expenseToUpdate.save();
    res.send("Expense Updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating expense");
  }
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;