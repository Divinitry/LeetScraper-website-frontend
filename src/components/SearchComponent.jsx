/*
use useState to store the search term and send it to the backend and retrieve the data
and also store the returned data in another useState to send it to the backend and store the data in 
the database for leetcodequestion, when the button is clicked, if they want to add it to the to-do-list
*/

import { useState } from "react";
import api from "../api";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState({})

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try{
        const response = await api.get(`/leetscraper/api/search/${encodeURIComponent(searchTerm)}`)
        const data = response.data
        setSearchData(data)
      }catch(error){
        alert(error)
      }
    } else {
      alert("Please enter a search term");
    }
  };


  return (
    <div>
      <h1>Search for your leetcode question below</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name of leetcode question"
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h1>{searchData.title}</h1>
      </div>
    </div>
  );
};

export default SearchComponent;
