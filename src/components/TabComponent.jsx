import React, { useState, useEffect } from 'react';
import "../styles/tabComponent.css"

const getRandomContent = () => {
  const content = [
    'This is random content 1',
    'Here is another random text!',
    'Welcome to random content 3!',
    'Random tab content 4, yay!',
    'Here is some more random stuff 5!',
  ];
  return content[Math.floor(Math.random() * content.length)];
};

function TabComponent() {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const defaultTab = {
      id: Math.random(),
      body: 'Default Tab',
      disable: false,
    };
    setTabs([defaultTab]);
    setSelectedTab(defaultTab.id);
    setContent('This is the default content for the default tab');
  }, []);

  const addNewTab = () => {
    const newTab = {
      id: Math.random(),
      body: 'New Tab',
      disable: false,
    };
    setTabs([...tabs, newTab]);
  };

  const tabClose = (id) => {
    const remainingTabs = tabs.filter((item) => item.id !== id);
    setTabs(remainingTabs);
    if (id === selectedTab && remainingTabs.length > 0) {
      setSelectedTab(remainingTabs[0].id);
      setContent(getRandomContent()); 
    } else if (remainingTabs.length === 0) {
      setSelectedTab(null);
      setContent(''); 
    }
  };

  const tabDisable = (id) => {
    const updatedTabs = tabs.map((item) => {
      if (item.id === id) {
        return { ...item, disable: true };
      }
      return item;
    });
    setTabs(updatedTabs);
  };

  const handleTabClick = (id) => {
    if (!tabs.find(tab => tab.id === id)?.disable) {
      setSelectedTab(id);
      setContent(getRandomContent());
    }
  };

  return (
    <div className="tab-container">
      <h1 className="tab-header">Tab Component</h1>
      <button className="add-tab-button" onClick={addNewTab}>
        New Tab
      </button>
      <div className="tab-list">
        {tabs.map((item, index) => (
          <div
            key={item.id}
            className={`tab-item ${item.disable ? 'disabled' : ''} ${
              selectedTab === item.id ? 'active' : ''
            }`}
            onClick={() => handleTabClick(item.id)}
          >
            {item.body} {index + 1}
            <button
              className="close-button"
              onClick={(e) => {
                e.stopPropagation();
                tabClose(item.id);
              }}
            >
              Close
            </button>
            <button
              className="disable-button"
              onClick={(e) => {
                e.stopPropagation();
                tabDisable(item.id);
              }}
            >
              Disable
            </button>
          </div>
        ))}
      </div>

      <div className="tab-content">
        <h2>Tab Content</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default TabComponent;
