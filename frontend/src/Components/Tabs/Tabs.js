import React, { useState } from "react";
import "./Tabs.css";

export default function Tabs(props) {
  const tabOptions = props.displayOptions;
  const tabChange = (index) => setActive(index);
  const [active, setActive] = useState(0);

  const checkActive = (index, className) => (active === index ? className : "");

  return (
    <div className="tabs">
      {tabOptions.map((tabOption, index) => (
        <span
          onClick={() => {
            tabChange(index);
            tabOption.callback(tabOption.name);
          }}
          className={`tabOption ${checkActive(index, "activeTab")}`}
          key={index}
        >
          {tabOption.name}
        </span>
      ))}
    </div>
  );
}
