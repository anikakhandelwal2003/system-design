// import React, { useEffect, useState } from 'react'
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import '../styles/paginationComponent.css'; 

// function PaginationComponent() {
//     const [offset, setOffset] = useState(0);
//     const [limit] = useState(10);
//     const [data, setData] = useState([]);
//     const [totalCount, setTotalCount] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);

//     const dummydatafetch = async () => {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//         const result = await response.json();
//         setData(result.results);
//         setTotalCount(Math.ceil(result.count / limit));
//     }

//     useEffect(() => {
//         dummydatafetch();
//     }, [offset]);

//     const handleNext = () => {
//         if (currentPage < totalCount) {
//             setCurrentPage(prev => prev + 1);
//             setOffset(offset + limit);
//         }
//     };

//     const handlePrev = () => {
//         if (currentPage > 1) {
//             setCurrentPage(prev => prev - 1);
//             setOffset(offset - limit);
//         }
//     };

//     return (
//         <div>
//             <h1>PaginationComponent</h1>
//             <table className="pagination-table">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Url</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data && data.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.name}</td>
//                             <td>{item.url}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="pagination-controls">
//                 <button onClick={handlePrev} disabled={currentPage === 1} className="pagination-button">
//                     <KeyboardDoubleArrowLeftIcon />
//                 </button>

//                 <span> Page {currentPage} of {totalCount} </span>

//                 <button onClick={handleNext} disabled={currentPage === totalCount} className="pagination-button">
//                     <KeyboardDoubleArrowRightIcon />
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default PaginationComponent;
import React, { useEffect, useState } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import '../styles/paginationComponent.css'; 

function PaginationComponent() {
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const dummydatafetch = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const result = await response.json();
        setData(result.results);
        setTotalCount(Math.ceil(result.count / limit));
    };

    useEffect(() => {
        dummydatafetch();
    }, [offset]);

    const handleNext = () => {
        if (currentPage < totalCount) {
            setCurrentPage(prev => prev + 1);
            setOffset(offset + limit);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            setOffset(offset - limit);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setOffset((page - 1) * limit);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalCount; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div>
            <h1>PaginationComponent</h1>
            <table className="pagination-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.url}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentPage === 1} className="pagination-button">
                    <KeyboardDoubleArrowLeftIcon />
                </button>

                <span>
                    {currentPage > 1 && <span onClick={() => handlePageChange(1)}>1</span>}
                    {currentPage > 3 && <span>...</span>}

                    {getPageNumbers().slice(Math.max(currentPage - 2, 1), currentPage + 1).map(page => (
                        <span 
                            key={page} 
                            onClick={() => handlePageChange(page)} 
                            style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === page ? 'bold' : 'normal' }}
                        >
                            {page}
                        </span>
                    ))}
                    {currentPage < totalCount - 2 && <span>...</span>}
                    {currentPage < totalCount && <span onClick={() => handlePageChange(totalCount)}>{totalCount}</span>}
                </span>

                <button onClick={handleNext} disabled={currentPage === totalCount} className="pagination-button">
                    <KeyboardDoubleArrowRightIcon />
                </button>
            </div>
        </div>
    );
}

export default PaginationComponent;
