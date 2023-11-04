import React from "react";
import "./Tab.scss";

function TabHeader({ activeTab, label, onClick }) {
  return (
    <div
      className={`tab ${activeTab === label ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

function Tab({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="tabs">
      <ol className="tab-list">
        {Object.values(tabs).map((tab) => {
          const { label } = tab;

          return (
            <TabHeader
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={() => setActiveTab(label)}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {Object.values(tabs).map((tab) => {
          if (tab.label !== activeTab) return undefined;
          return tab.component;
        })}
      </div>
    </div>
  );
}

export default Tab;
