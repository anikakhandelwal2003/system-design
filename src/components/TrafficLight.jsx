import React, { useEffect, useState } from 'react';

const LIGHT = {
    RED: 'red',
    YELLOW: 'yellow',
    GREEN: 'green',
};

function TrafficLight() {
    const [light, setLight] = useState(LIGHT.RED);
    const [counter, setCounter] = useState(10);

    const getNextLight = (currentLight) => {
        switch (currentLight) {
            case LIGHT.RED:
                return LIGHT.YELLOW;
            case LIGHT.YELLOW:
                return LIGHT.GREEN;
            case LIGHT.GREEN:
            default:
                return LIGHT.RED;
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (counter === 0) {
                setLight((prevLight) => getNextLight(prevLight));
                setCounter(10); 
            } else {
                setCounter((prev) => prev - 1); 
            }
        }, 1000);

        return () => clearInterval(timer); 
    }, [counter]);

    const renderLight = (color, isActive, label) => (
        <div
            style={{
                marginLeft: '300px',
                backgroundColor: isActive ? color : 'black',
                width: '4%',
                height: '70px',
                marginTop: '70px',
                textAlign: 'center',
            }}
        >
            <h3>{isActive ? label : null}</h3>
            <h3>{isActive ? counter : null}</h3>
        </div>
    );

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Traffic Light</h1>
            {renderLight('red', light === LIGHT.RED, 'Stop')}
            {renderLight('yellow', light === LIGHT.YELLOW, 'Hold')}
            {renderLight('green', light === LIGHT.GREEN, 'Go')}
        </div>
    );
}

export default TrafficLight;
