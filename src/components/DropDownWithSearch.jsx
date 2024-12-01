import { useEffect, useState } from "react";
import "../styles/dropDownWithSearch.css";

function DropDownWithSearch({ setSelectedData,data, isMulti = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);

  const [selectedValue, setSelectedValue] = useState("please Select item");
  const [multiSelectedValue, setMultiSelectedValue] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length > 0) {
      setTimeout(() => {
        handleSearch(search);
      }, 2000);
    } else {
      setUpdatedData(data);
    }
  }, [search]);

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  useEffect(()=>{
    if(multiSelectedValue.length>0 && isMulti)
   setSelectedData(multiSelectedValue)
  },[multiSelectedValue])

  const handleSearch = (search) => {
    const filterData = data.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setUpdatedData(filterData);
  };

  const handleDataSelect = (item) => {
    if (isMulti) {
      if(multiSelectedValue.includes(item))
      {
        setMultiSelectedValue(multiSelectedValue.filter((value)=>value!=item));
      }
      else{
        setMultiSelectedValue([...multiSelectedValue, item]);
      }
    } else {
      setSelectedValue(item);
      setIsOpen(false);
    }
  };

  const handleOnRemove=(item)=>{
   setMultiSelectedValue(multiSelectedValue.filter((value)=>value!=item));
  }

  return (
    <>
      {isMulti && multiSelectedValue.length > 0 ? (
        <div>
          {multiSelectedValue.map((item) => {
            return (
              <div className="multi-select-value">
                <h5>{item}</h5>
                <button onClick={()=>handleOnRemove(item)}>x</button>
              </div>
            );
          })}
        </div>
      ) : (
        <h2
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {selectedValue}
        </h2>
      )}
      {isOpen && (
        <div className="inner-dropdown">
          <input
            name="search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Please Search ..."
          />

          {updatedData.map((item) => {
            return (
              <>
                <p
                  className={selectedValue === item.title ? "active" : " "}
                  key={item.id}
                >
                  {isMulti ? (
                    <input
                      type="checkbox"
                      checked={multiSelectedValue.includes(item.title)}
                      onClick={() => handleDataSelect(item.title)}
                    ></input>
                  ) : (
                    <input
                      type="radio"
                      onClick={() => handleDataSelect(item.title)}
                    />
                  )}
                  {item.title}
                </p>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}

export default DropDownWithSearch;
