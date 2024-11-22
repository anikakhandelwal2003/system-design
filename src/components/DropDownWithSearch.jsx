import { useEffect, useState } from "react";
import '../styles/dropDownWithSearch.css'

function DropDownWithSearch({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedData,setUpdatedData]=useState([]);
  
  const [selectedValue,setSelectedValue]=useState("please Select item")
  const [search,setSearch] =useState("");

  useEffect(()=>{
    if(search.length > 0) 
    {
      setTimeout(()=>{
        handleSearch(search);  
    },2000)
    }else{
      setUpdatedData(data);
    }
   
  },[search])

  useEffect(()=>{
  setUpdatedData(data);
  },[data])

  const handleSearch=(search)=>{
    
    const filterData=data.filter((item)=>{
     return (
      item.title.toLowerCase().includes(search.toLowerCase()))
    })
    setUpdatedData(filterData);
    
  }

  const handleDataSelect=(item)=>{
   setSelectedValue(item);
   setIsOpen(false);
  }

  return (
    <>
      <h2 onClick={()=>{
        setIsOpen(!isOpen)}}>{selectedValue}</h2>
      {isOpen && (
        <div className="inner-dropdown">
          <input
           name="search"
           type="text"
           onChange={(e)=>setSearch(e.target.value)
           }
           placeholder="Please Search ..."
          />
          
          {updatedData.map((item) => {
            return <p className={selectedValue===item.title ? "active":" "}key={item.id} onClick={()=>handleDataSelect(item.title)}>{item.title}</p>;
          })} 
        </div>
      )}
    </>
  );
}

export default DropDownWithSearch;
