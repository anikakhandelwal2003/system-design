import React, { useState } from 'react';
import '../styles/tabCommonComponent.css';

function Tab({ content, title, isActive, onClick, disable }) {
  return (
    <div>
      <div 
        className={disable ? 'tab-content-disable' : (isActive ? 'tab-content-active' : 'tab-content')}
        onClick={!disable ? onClick : undefined} 
        style={{ cursor: disable ? 'not-allowed' : 'pointer' }} 
      >
        <h2>{title}</h2>
      </div>
      {isActive && !disable && <p>{content}</p>} 
    </div>
  );
}

function TabCommonComponent() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  return (
    <div className='main'>
      <Tab
        content="Content for tab 1"
        title="Tab 1"
        isActive={activeTab === 0}
        disable={false}
        onClick={() => handleTabClick(0)}
      />
      <Tab
        content="Content for tab 2"
        title="Tab 2"
        isActive={activeTab === 1}
        disable={false}
        onClick={() => handleTabClick(1)}
      />
      <Tab
        content="Content for tab 3"
        title="Tab 3"
        isActive={activeTab === 2}
        disable
        onClick={() => handleTabClick(2)}
      />
      <Tab
        content="Content for tab 4"
        title="Tab 4"
        isActive={activeTab === 3}
        disable={false}
        onClick={() => handleTabClick(3)}
      />
    </div>
  );
}

export default TabCommonComponent;
