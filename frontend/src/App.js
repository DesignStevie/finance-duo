import { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import "./App.css";
import Modal from "./Components/Modal/Modal";
import UserItem from "./Components/UserItem/ExpenseItem";
import Notification from "./Components/Notification/Notification";
import Tabs from "./Components/Tabs/Tabs";
import AnalyticsAverage from "./Components/AnalyticsAverage/AnalyticsAverage";

function App() {
  const [currentTab, setCurrentTab] = useState("All");

  const [allItemsList, setAllItemsList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const [showAddUser, setShowAddUser] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    Axios.get("https://finance-duo-nine.vercel.app/api/getExpenses")
      .then((response) => {
        setAllItemsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //-----------------Analytics-----------------//
  const getTotalIncome = () => {
    let total = 0;

    allItemsList.map((item) => {
      if (item.type === "Income") {
        total += +item.amount;
      }
      return null;
    });

    return total;
  };

  const getTotalExpenses = () => {
    let total = 0;

    allItemsList.map((item) => {
      if (item.type === "Expense") {
        total += +item.amount;
      }
      return null;
    });

    return total;
  };
  //-----------------Modal Controls-----------------//
  const handleCancel = () => {
    setShowAddUser(false);
  };
  const showAddModel = () => {
    setShowAddUser(true);
  };
  //-----------------Add a new expense-----------------//
  const addExpense = async (name, type, date, amount) => {
    await Axios.post(
      "https://finance-duo-nine.vercel.app/api/addExpense",
      {
        name,
        type,
        date,
        amount,
      }
    )
      .then((response) => {
        setAllItemsList([
          ...allItemsList,
          {
            _id: response.data._id,
            name: name,
            type: type,
            date: date,
            amount: amount,
          },
        ]);
      })
      .then(() => {
        setNotificationMessage(`${name} added`);
      })
      .then(() => {
        showNotification();
      })
      .catch((e) => console.error(e));
  };
  //-----------------Remove an expense-----------------//
  const removeExpense = (id) => {
    Axios.delete(
      `https://finance-duo-nine.vercel.app/removeExpense/${id}`
    )
      .then(() => {
        setAllItemsList(
          allItemsList.filter((val) => {
            return val._id !== id;
          })
        );
      })
      .then(() => {
        handleTabDisplay(currentTab);
      })
      .then(() => {
        setNotificationMessage(`Item removed`);
      })
      .then(() => {
        showNotification();
      })
      .catch((e) => console.error(e));
  };
  //-----------------update an expense-----------------//
  const updateExpense = (id, name, type, date, amount) => {
    const newName = name;
    const newType = type;
    const newDate = date;
    const newAmount = amount;

    Axios.put("https://finance-duo-nine.vercel.app/api/updateExpense", {
      id: id,
      newName: newName,
      newType: newType,
      newDate: newDate,
      newAmount: newAmount,
    }).then(() => {
      setAllItemsList(
        allItemsList.map((val) => {
          return val._id === id
            ? {
                _id: id,
                name: newName,
                type: newType,
                date: newDate,
                amount: newAmount,
              }
            : val;
        })
      );
    });
  };
  //-----------------Notification Controls-----------------//
  const closeNotification = () => {
    setNotification(false);
  };
  const showNotification = () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  //-----------------Sort Tabs-----------------//

  useEffect(() => {
    setDisplayList(
      [...allItemsList].sort(
        (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
    handleTabDisplay(currentTab);
  }, [allItemsList]);

  const handleTabDisplay = useCallback(
    (tab) => {
      //console.log(allItemsList);
      if (tab === "Expense") {
        const showAllExpenses = allItemsList.filter(
          (item) => item.type === "Expense"
        );
        setCurrentTab("Expense");
        setDisplayList(showAllExpenses);
        //console.log("Show Expense was called");
      } else if (tab === "Income") {
        const showAllIncome = allItemsList.filter(
          (item) => item.type === "Income"
        );
        setCurrentTab("Income");
        setDisplayList(showAllIncome);
        //console.log("Show Income was called");
      } else {
        setCurrentTab("All");
        setDisplayList(allItemsList);
        //console.log("Show All was called");
      }
    },
    [allItemsList]
  );

  const headerTabs = [
    { name: "All", callback: handleTabDisplay },
    { name: "Expense", callback: handleTabDisplay },
    { name: "Income", callback: handleTabDisplay },
  ];
  //-----------------Sort Weeks-----------------//

  // //------------------Gets the weeks------------------//
  //   const getWeek = (date) => {
  //     var onejan = new Date(date.getFullYear(), 0, 1);
  //     var millisecsInDay = 86400000;
  //     return Math.ceil(
  //       ((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
  //     );
  //   };

  // //------------------Gets All Results------------------//
  // const allTime = () => {
  //   const allItemsList = [...dateList].sort(
  //     (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
  //   );

  //   setDisplayList(allItemsList);
  //   handleTabDisplay(currentTab);

  //   // if (type === "All") {
  //   //   setShowList(sortedList);
  //   // } else if (type === "Expense") {
  //   //   showExpenses();
  //   // } else {
  //   //   showIncome();
  //   // }
  // };
  // //------------------Gets this weeks results------------------//
  // const thisWeek = () => {
  //   const currentWeek = getWeek(new Date());
  //   const filteredList = dateList.filter(
  //     (item) => getWeek(new Date(item.date)) === currentWeek
  //   );
  //   const allItemsList = filteredList.sort(
  //     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  //   );
  //   setDisplayList(allItemsList);
  //   handleTabDisplay(currentTab);

  //   // if (type === "All") {
  //   //   setShowList(sortedList);
  //   // } else if (type === "Expense") {
  //   //   showExpenses();
  //   // } else {
  //   //   showIncome();
  //   // }
  // };
  // //------------------Gets lasts weeks results------------------//
  // const lastWeek = () => {
  //   const currentWeek = getWeek(new Date());
  //   const previousWeek = currentWeek - 1;
  //   const filteredList = dateList.filter(
  //     (item) => getWeek(new Date(item.date)) === previousWeek
  //   );
  //   const sortedList = filteredList.sort(
  //     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  //   );

  //   setDisplayList(allItemsList);
  //   handleTabDisplay(currentTab);

  //   // if (type === "All") {
  //   //   setShowList(sortedList);
  //   //   console.log(showList);
  //   // } else if (type === "Expense") {
  //   //   showExpenses();
  //   // } else {
  //   //   showIncome();
  //   // }
  // };

  //------------------Groups by dates------------------//
  const groupByDate = (list) => {
    const result = {};
    list.forEach((item) => {
      const date = item.date;
      if (result[date]) {
        result[date].push(item);
      } else {
        result[date] = [item];
      }
    });
    return result;
  };
  const grouped = groupByDate(displayList);

  return (
    <>
      <div className="mainContainer">
        <div className="sidePanel">
          <div className="subContainer">
            <h2>Analytics</h2>
            <div></div>
          </div>
          <div className="subContainer">
            <AnalyticsAverage allItems={displayList} />
          </div>
          <div className="subContainer">
            <h2>Total</h2>
            <div className="analyticsTotal">
              <h4>Income</h4>
              <p className="totalIncome">${getTotalIncome()}</p>
            </div>
            <div className="analyticsTotal">
              <h4>Expenses</h4>
              <p className="totalExpense">${getTotalExpenses()}</p>
            </div>
            <div className="analyticsTotal">
              <h4>Remainder</h4>
              <p>
                $
                {Math.round(
                  (getTotalIncome() - getTotalExpenses() + Number.EPSILON) * 100
                ) / 100}
              </p>
            </div>
          </div>
        </div>
        <div className="actions">
          <div className="headerTabs">
            <Tabs displayOptions={headerTabs} />
          </div>
          <button className="headerButton primaryButton" onClick={showAddModel}>
            + Add New Entry
          </button>
        </div>
        {showAddUser && (
          <Modal
            cancelAction={handleCancel}
            type={"addUser"}
            addUser={addExpense}
          />
        )}
        {notification && (
          <div className="showNotification">
            <Notification
              message={notificationMessage}
              closeNotification={closeNotification}
            />
          </div>
        )}
        <div className="itemContainer">
          {Object.keys(grouped)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date) => {
              return (
                <div className="dateCluster" key={date}>
                  <h4 className="clusterDate">{date}</h4>
                  {grouped[date].map((item, index) => {
                    return (
                      <UserItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        type={item.type}
                        date={item.date}
                        amount={item.amount}
                        removeExpense={removeExpense}
                        updateExpense={updateExpense}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
