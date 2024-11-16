import React, { useEffect, useState, useRef } from 'react';

function InfinteScrollWithIntersectionObserver() {
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null); 

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

    const lastItemRef = (node) => {
        if (loading) return; 
        if (observerRef.current) observerRef.current.disconnect(); 

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset(prevOffset => prevOffset + limit); 
            }
        });

        if (node) observerRef.current.observe(node); 
    };

    return (
        <div>
            <h1>Infinite Scroll with Intersection Observer</h1>
            <table className="pagination-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        if (data.length === index + 1) {
                            return (
                                <tr ref={lastItemRef} key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.url}</td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.url}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {loading && <p>Loading more data...</p>}
            {!hasMore && <p>No more data to load.</p>}
        </div>
    );
}

export default InfinteScrollWithIntersectionObserver;
