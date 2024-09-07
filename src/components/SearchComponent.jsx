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
        title_slug: searchData.title_slug || "",
        difficulty: searchData.difficulty || "",
        hints: searchData.Hints ? searchData.Hints.toString() : "", 
        companies: searchData.companies || "",
        topics: searchData.topics ? searchData.topics.toString() : "", 
        similar_questions: searchData.SimilarQuestions ? searchData.SimilarQuestions.toString() : "",
        code_stubs: searchData.code_stubs || "",
        body: searchData.body || "",
        is_paid_only: searchData.isPaidOnly || false,
        todolist_id: 1,
      });
      alert("LeetCode question added to your To-Do List!");
    } catch (error) {
      console.error(error);
      alert("Error adding question to To-Do List");
    }
  };
  

  return (
    <div>
      <h1>Search for your LeetCode question below</h1>
      <form onSubmit={handleSubmit}>
        <input
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
