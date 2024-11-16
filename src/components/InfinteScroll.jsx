import React, { useEffect, useState } from 'react';

function InfiniteScroll() {
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const dummydatafetch = async () => {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const result = await response.json();
        setData(prevData => [...prevData, ...result.results]); 
        setHasMore(result.results.length > 0); 
        setLoading(false);
    };

    useEffect(() => {
        dummydatafetch();
    }, [offset]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && !loading && hasMore) {
            setOffset(prevOffset => prevOffset + limit);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); 
    }, [loading, hasMore]);

    return (
        <div>
            <h1>Infinite Scroll Component</h1>
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
            {loading && <p>Loading more data...</p>}
            {!hasMore && <p>No more data to load.</p>}
        </div>
    );
}

export default InfiniteScroll; 