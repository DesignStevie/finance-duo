import React, { useState } from "react";
import "./TimeFrame.css";

function TimeFrame(props) {
  const allItems = props.allItems;
  const [openDropdown, setOpenDropdown] = useState(false);

  //------------------Gets the weeks------------------//
  const getWeek = (date) => {
    var onejan = new Date(date.getFullYear(), 0, 1);
    var millisecsInDay = 86400000;
    return Math.ceil(
      ((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
    );
  };

  //------------------Gets All Results------------------//
  const allTime = () => {
    return allItems;
  };
  //------------------Gets this weeks results------------------//
  const thisWeek = () => {
    const currentWeek = getWeek(new Date());
    const filteredList = allItems.filter(
      (item) => getWeek(new Date(item.date)) === currentWeek
    );

    return filteredList;
  };
  //------------------Gets lasts weeks results------------------//
  const lastWeek = () => {
    const currentWeek = getWeek(new Date());
    const previousWeek = currentWeek - 1;
    const filteredList = allItems.filter(
      (item) => getWeek(new Date(item.date)) === previousWeek
    );

    return filteredList;
  };

  const timeFrames = [
    { name: "All Time", list: allTime(), average: 365 },
    { name: "This Week", list: thisWeek(), average: 7 },
    { name: "Last Week", list: lastWeek(), average: 7 },
    { name: "This Month", list: 0, average: 30 },
    { name: "Last Month", list: 0, average: 30 },
  ];

  const [selected, setSelected] = useState(timeFrames[0].name);

  const handleOpen = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClick = (index, list) => {
    setSelected(timeFrames[index].name);
    props.average(timeFrames[index].average);
    props.getList(list);
    setOpenDropdown(!openDropdown);
    console.log(list);
  };

  return (
    <div className="timeFrame">
      <div onClick={handleOpen} className="selectedTimeFrame">
        <p>{selected}</p>
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.99997 6.45834C4.88885 6.45834 4.78469 6.44098 4.68747 6.40625C4.59024 6.37153 4.49997 6.31251 4.41663 6.22917L0.562465 2.37501C0.409687 2.22223 0.33677 2.03126 0.343715 1.80209C0.350659 1.57292 0.43052 1.38195 0.583298 1.22917C0.736076 1.07639 0.93052 1.00001 1.16663 1.00001C1.40274 1.00001 1.59719 1.07639 1.74996 1.22917L4.99997 4.47917L8.2708 1.20834C8.42358 1.05556 8.61455 0.982644 8.84371 0.989589C9.07288 0.996533 9.26385 1.07639 9.41663 1.22917C9.56941 1.38195 9.6458 1.57639 9.6458 1.81251C9.6458 2.04862 9.56941 2.24306 9.41663 2.39584L5.5833 6.22917C5.49996 6.31251 5.40969 6.37153 5.31247 6.40625C5.21524 6.44098 5.11108 6.45834 4.99997 6.45834Z"
            fill="#5D4FFF"
          />
        </svg>
      </div>
      {openDropdown && (
        <div className="timeFrameOptions">
          {timeFrames.map((option, index) => {
            return (
              <span
                key={index}
                onClick={() => handleClick(index, option.list)}
                className="option"
              >
                {option.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TimeFrame;
