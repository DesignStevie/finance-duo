import React, { useState } from "react";
import "./Modal.css";

export default function Modal(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);

  const updateExpenseObj = () => {
    const newName = name === "" ? props.name : name;
    const newType = type === "" ? props.itemType : type;
    const newDate = date === "" ? props.date : date;
    const newAmount = amount === 0 ? props.amount : amount;

    props.updateExpense(newName, newType, newDate, newAmount);
    handleHide();
  };
  //-----------------Modal Submit New Expense-----------------//

  const handleSubmit = () => {
    const newType = type === "" && "Expense";
    props.addUser(name, newType, date, amount);
    handleHide();
  };

  //-----------------------Modal Cancel-----------------------//

  const handleHide = () => {
    props.cancelAction();
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setDate(date.toDateString());
    } else {
      setDate("");
    }
  };

  return (
    <>
      {props.type === "addUser" ? (
        <div className="modal">
          <div className="modalContent">
            <div className="modalTitle">
              <h2>Add New Entry</h2>
            </div>
            <div className="modalBody">
              <input
                type="text"
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <select
                id="type"
                name="type"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <option value="Expense" selected="defualtValue">
                  Expense
                </option>
                <option value="Income">Income</option>
              </select>
              <input type="date" onChange={handleDateChange} />
              <input
                type="number"
                placeholder="Amount"
                onChange={(event) => {
                  setAmount(event.target.value);
                }}
              />
            </div>
            <div className="modalFooter">
              <button onClick={handleHide}>Cancel</button>
              <button className="primaryButton" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal">
          <div className="modalContent">
            <div className="modalTitle">
              <h2>Update Entry</h2>
            </div>
            <div className="modalBody">
              <input
                type="text"
                placeholder={props.name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <select
                id="type"
                name="type"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                {props.itemType === "Expense" ? (
                  <>
                    <option value="Expense"> Expense</option>
                    <option value="Income">Income</option>
                  </>
                ) : (
                  <>
                    <option value="Income">Income</option>
                    <option value="Expense"> Expense</option>
                  </>
                )}
              </select>
              <input
                type="date"
                value={
                  new Date(
                    new Date(props.date).getTime() -
                      new Date(props.date).getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .split("T")[0]
                }
                onChange={handleDateChange}
              />
              <input
                type="number"
                placeholder={props.amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                }}
              />
            </div>
            <div className="modalFooter">
              <button onClick={handleHide}>Cancel</button>
              <button className="primaryButton" onClick={updateExpenseObj}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
