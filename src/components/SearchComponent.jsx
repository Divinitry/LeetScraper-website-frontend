import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";

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
      try {
        const response = await api.get(`/leetscraper/api/search/${encodeURIComponent(searchTerm)}`);
        const data = response.data;
        setSearchData(data);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please enter a search term");
    }
  };

  const addToCodeList = async () => {
    try {
      const response = await api.post(`/leetscraper/todolist/questions/add/`, {
        question_title: searchData.title || "",
        title_slug: searchData.titleSlug || "",
        difficulty: searchData.difficulty || "",
        hints: searchData.Hints ? searchData.Hints.toString() : "", 
        companies: searchData.companies || "",
        topics: searchData.topics ? searchData.topics.toString() : "", 
        similar_questions: searchData.SimilarQuestions ? searchData.SimilarQuestions.toString() : "",
        code_stubs: searchData.code_stubs || "",
        body: searchData.Body || "",
        is_paid_only: searchData.isPaidOnly || false,
      });
    
      alert("LeetCode question added successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        alert(`Error: ${error.response.data.detail || "Something went wrong on the server"}`);
      } else if (error.request) {
        console.error("Error request data:", error.request);
        alert("Error: No response from the server. Please check your network or try again later.");
      } else {
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div>
      <h1>Search for your LeetCode question below</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-black"
          type="text"
          placeholder="Name of LeetCode question"
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h1>{searchData.title}</h1>
        <p>{searchData.difficulty}</p>
        <p>{searchData.Hints}</p>
        <p>{searchData.topics}</p>
        <button onClick={addToCodeList}>Add to your code list</button>
      </div>
    </div>
  );
};

export default SearchComponent;
