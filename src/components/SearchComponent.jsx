import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await api.get(
          `/leetscraper/api/search/${encodeURIComponent(searchTerm)}`
        );
        const data = response.data;
        setSearchData(data);
        setMessage(""); 
        setIsError(false); 
      } catch (error) {
        setMessage("An error occurred while searching. Please try again.");
        setIsError(true);
      }
    } else {
      setMessage("Please enter a search term.");
      setIsError(true); 
    }
  };

  const addToCodeList = async () => {
    try {
      const response = await api.post(`/leetscraper/todolist/questions/add/`, {
        question_title: searchData.title || "",
        title_slug: searchData.titleSlug || "",
        difficulty: searchData.difficulty || "",
        hints: searchData.Hints || [],
        companies: searchData.companies || "",
        topics: searchData.topics || [],
        similar_questions: searchData.SimilarQuestions
          ? searchData.SimilarQuestions.toString()
          : "",
        code_stubs: searchData.code_stubs || "",
        body: searchData.Body || "",
        is_paid_only: searchData.isPaidOnly || false,
      });

      setMessage("LeetCode question added successfully!");
      setIsError(false);
      setSearchTerm("");
      setSearchData({});
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error || "Something went wrong on the server";
        if (errorMessage === "Question already in your to-do list") {
          setMessage("This question is already in your to-do list.");
        } else {
          setMessage(errorMessage);
        }
        setIsError(true); 
      } else if (error.request) {
        setMessage("No response from the server. Please check your network or try again later.");
        setIsError(true); 
      } else {
        setMessage(error.message);
        setIsError(true); 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl mb-8">Search for a LeetCode Question</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center py-2">
          <input
            className="appearance-none bg-white border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-0 rounded-2xl h-10"
            type="text"
            placeholder="Enter LeetCode question name"
            value={searchTerm}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="flex-shrink-0 hover:bg-white/10 text-white py-2 px-4 rounded text-sm"
          >
            Search
          </button>
        </div>
        {message && (
          <p className={`text-sm mt-2 ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </form>

      {searchData.title && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold">{searchData.title}</h2>
          <p className="text-gray-400">Difficulty: {searchData.difficulty}</p>
          <button
            onClick={addToCodeList}
            className="relative inline-flex h-12 overflow-hidden rounded-full mt-6 p-[1px] focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
              Add to Code List
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
