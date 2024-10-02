import { useState } from "react";
import api from "../api";
import AddIcon from "@mui/icons-material/Add";

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
      await api.post(`/leetscraper/todolist/questions/add/`, {
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
        const errorMessage =
          error.response.data.error || "Something went wrong on the server";
        if (errorMessage === "Question already in your to-do list") {
          setMessage("This question is already in your to-do list.");
        } else {
          setMessage(errorMessage);
        }
        setIsError(true);
      } else if (error.request) {
        setMessage(
          "No response from the server. Please check your network or try again later."
        );
        setIsError(true);
      } else {
        setMessage(error.message);
        setIsError(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="py-10 px-32 w-full max-w-[900px]">
        <div className="flex flex-col">
          <div className="text-start bg-white/10 rounded-t-lg py-2 px-5 w-fit items-start">
            <span className="text-white/30">Leetcode</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white/10 px-6 py-6 rounded-b-2xl rounded-tr-2xl"
          >
            <div className="flex items-center bg-black rounded-full border-2 border-black">
              <input
                className="appearance-none bg-white/10 border-none w-full mr-3 py-2 px-4 leading-tight focus:outline-none focus:ring-0 rounded-full h-12 placeholder-white/30"
                type="text"
                placeholder="Search Question"
                value={searchTerm}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="flex-shrink-0 text-white py-2 pr-4 rounded text-sm hover:text-white/80"
              >
                Search
              </button>
            </div>
            {message && (
              <p
                className={`text-sm mt-2 ${
                  isError ? "text-red-500" : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        {searchData.title && (
          <div className="mt-8 text-center">
            <table className="table-auto w-full text-left mb-4">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-white/70 font-normal">Title</th>
                  <th className="px-6 py-3 text-white/70 font-normal">Difficulty</th>
                  <th className="px-6 py-3 text-white/70 font-normal">Topics</th>
                  <th className="px-6 py-3 text-white/70 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="bg-stone-950 border-t border-white/30 px-6 py-3"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "300px",
                    }}
                  >
                    <a
                      href={`/todolist/code/${searchData.id}`}
                      className="text-white hover:text-gray-400 transition-colors"
                    >
                      {searchData.title}
                    </a>
                  </td>
                  <td className="bg-stone-950 border-t border-white/30 px-6 py-3">
                    <span
                      className={`${
                        searchData.difficulty === "Easy"
                          ? "text-green-400"
                          : searchData.difficulty === "Medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {searchData.difficulty}
                    </span>
                  </td>
                  <td className="bg-stone-950 border-t border-white/30 px-6 py-3">
                    {searchData.topics?.map((topic, index) => (
                      <span
                        key={index}
                        className="bg-white/20 rounded-full px-3 py-1 text-xs mr-2"
                      >
                        {topic}
                      </span>
                    ))}
                  </td>
                  <td className="bg-stone-950 border-t border-white/30 px-6 py-3 text-center">
                    <button
                      onClick={addToCodeList}
                      className="text-white focus:outline-none hover:text-white/50 transition"
                    >
                      <AddIcon />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
