import React, { useState } from "react";
import TimeFrame from "../TimeFrame/TimeFrame";
import "./AnalyticsAverage.css";

function AnalyticsAverage(props) {
  const [itemList, setItemList] = useState(props.allItems);
  const [averageCount, setAverageCount] = useState(1);

  const setList = (list) => {
    setItemList(list);
  };
  const setAverage = (num)=>{
    setAverageCount(num);
  }

  const getTotalIncome = () => {
    let total = 0;

    itemList.map((item) => {
      if (item.type === "Income") {
        total += +item.amount;
      }
      return null
    });

    if (total !== 0) {
      return Math.round((total / averageCount + Number.EPSILON) * 100) / 100;
    } else {
      return 0;
    }
  };

  const getTotalExpenses = () => {
    let total = 0;

    itemList.map((item) => {
      if (item.type === "Expense") {
        total += +item.amount;
      }
      return null
    });

    if (total !== 0) {
      return Math.round((total / averageCount + Number.EPSILON) * 100) / 100;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div className="analyticsAverageHeader">
        <h2>Average</h2>
        <TimeFrame allItems={props.allItems} getList={setList} average={setAverage} />
      </div>
      <div className="averages">
        <div className="averageIncome">
          <h4>Income</h4>
          <p>${getTotalIncome()}</p>
        </div>
        <div className="averageExpense">
          <h4>Expenses</h4>
          <p>${getTotalExpenses()}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsAverage;
