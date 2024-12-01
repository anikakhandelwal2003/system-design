import React, { useState } from "react";
import "../styles/test.css";

function Test() {
  const intialData = [
    {
      id: 1,
      title: "Tab 1",
      content: "Content for tab 1",
      disable: true,
    },
  ];
  const [tabs, setTabs] = useState(intialData);
  const [activeTab, setActiveTab] = useState(5);

  const addNewTab = () => {
    const newId = tabs.length + 1;
    setTabs([
      ...tabs,
      {
        id: newId,
        title: `Tab ${newId}`,
        content: `Contenct for tab ${newId}`,
        disable: false,
      },
    ]);
  };

  const handleTabOpen = (id) => {
    setActiveTab(id);
  };

  const handleOnClose = (item) => {
    if(!item.disable && tabs.length > 1){
        if(activeTab===item.id){
           var preTab=null;
            tabs.forEach((item)=>{
                if(item.id!==activeTab)
                    preTab=item.id;
                else{
                    return;
                }
            })
            setActiveTab(preTab);
        }

        const data = tabs.filter((tab) => {
            return(
                tab.id !== item.id
            )
            });
        setTabs(data);
        
    }
  };

  return (
    <div className="main">
      <div className="main-tab">
        {tabs.map((item) => {
          return (
            <div className={`tab${item.disable ? "active":""}`}>
              <h5 onClick={() => handleTabOpen(item.id)}>{item.title}</h5>
              <button onClick={() => handleOnClose(item)}>X</button>
            </div>
          );
        })}
        <button onClick={() => addNewTab()}>+</button>
      </div>
      {tabs.find((tab) => tab.id === activeTab && !tab.disable)?.content || "No Active Tabs"}
    </div>
  );
}

export default Test;
