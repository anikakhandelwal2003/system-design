// import React, { useEffect, useState } from "react";
// import "../styles/gridComponent.css";

// function Grid({ size }) {
//   const [cells, setCells] = useState([]);
//   const [selectedCells, setSelectedCells] = useState([]);

//   useEffect(() => {
//     const grid = [];

//     for (let i = 1; i <= size * size; i++) {
//       grid.push(i);
//     }
//     setCells(grid);
//   }, [size]);

//   useEffect(() => {
//     if (selectedCells.length === size * size) {

//         selectedCells.forEach(()=>{
//             setInterval(() => {
//                 setSelectedCells((prevSelectedCells) => {
//                   const newSelectedCells = prevSelectedCells.slice(1);
//                   return newSelectedCells;
//                 });
//               },1000);
//         })
//     }
//   }, [selectedCells, size]);

//   console.log(selectedCells, "selected");

//   return (
//     <div>
//       <h1>Grid</h1>
//       <div className="grid-container">
//         {cells.map((item, index) => (
//           <div
//             key={index}
//             className={
//               selectedCells.includes(item) ? "grid-cell-selected" : "grid-cell"
//             }
//             onClick={() => {
//               if (!selectedCells.includes(item)) {
//                 setSelectedCells([...selectedCells, item]);
//               }
//             }}
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function GridComponent() {
//   return (
//     <div>
//       <Grid size={2} />
//     </div>
//   );
// }

// export default GridComponent;
import React, { useCallback, useEffect, useRef, useState } from "react";

const GridComponent = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(false))
  );

  const queue = useRef([]);
  const timerId = useRef([]);

  const handleClick = useCallback(
    (rowIn, colIn, flag) => {
      if (timerId.current.length > 0 && flag) {
        return;
      }

      if (grid[rowIn][colIn] && flag) {
        return;
      }

      setGrid((prev) => {
        const copyGrid = JSON.parse(JSON.stringify(prev));
        copyGrid[rowIn][colIn] = flag;
        if (flag) {
          const index = queue.current.findIndex(
            ([r, c]) => r === rowIn && c === colIn
          );
          if (index === -1) {
            queue.current.push([rowIn, colIn]);
          }
        }
        return copyGrid;
      });
    },
    [grid]
  );

  useEffect(() => {
    if (queue.current.length === 9) {
      //   queue.current.reverse();
      queue.current.forEach(([rowIn, colIn], idx) => {
        const timer = setTimeout(() => {
          handleClick(rowIn, colIn, false);
        }, 1000 * (idx + 1));
        timerId.current.push(timer);
      });
      queue.current = [];
    }
  }, [grid, handleClick]);

  useEffect(() => {
    return () => {
      timerId.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(3, 1fr)`,
        gap: "5px",
        width: "12rem",
      }}
    >
      {grid.map((row, rowIn) => {
        return row.map((col, colIn) => {
          return (
            <div
              key={`${rowIn}-${colIn}`}
              style={{
                height: "50px",
                width: "50px",
                border: "1px solid black",
                backgroundColor: col ? "green" : "",
              }}
              onClick={() => handleClick(rowIn, colIn, true)}
            ></div>
          );
        });
      })}
    </div>
  );
};

export default GridComponent;
