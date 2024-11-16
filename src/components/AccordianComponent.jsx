import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../styles/accordianComponent.css';

function AccordianComponent() {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); 

    const dummydatafetch = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=1`);
        const result = await response.json();
        setData(result.results);
    };

    useEffect(() => {
        dummydatafetch();
    }, []);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index); 
    };

    return (
        <div className="accordion-container">
            {data && data.map((item, index) => (
                <div key={index} className="accordion-item">
                    <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                        <h1>{item.name}</h1>
                        {activeIndex === index ? <RemoveIcon /> : <AddIcon />}
                    </div>
                    {activeIndex === index && (
                        <div className="accordion-content">
                            <p>{item.url}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AccordianComponent;
