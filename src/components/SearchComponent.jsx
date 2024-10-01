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
      <div className="py-10 px-32">
      <div className="flex justify-center mb-2">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMidYMid meet"
            className="h-32 w-32"
          >
            <rect width="500" height="500" fill="white" />
            <g
              transform="translate(0,500) scale(0.1,-0.1)"
              fill="black"
              stroke="none"
            >
              <path d="M0 2500 l0 -2500 2500 0 2500 0 0 2500 0 2500 -2500 0 -2500 0 0 -2500z m843 1993 c29 -21 53 -52 77 -98 l35 -68 3 -1526 2 -1526 -224 -224 c-205 -204 -225 -222 -231 -200 -3 13 -4 798 -3 1744 l3 1720 28 60 c16 33 40 73 55 89 68 73 176 85 255 29z m3439 17 c89 -27 140 -67 171 -132 47 -100 49 -127 45 -703 -4 -607 -2 -591 -80 -680 -52 -59 -84 -75 -150 -75 -68 0 -113 24 -159 85 -69 89 -69 92 -69 626 l0 479 -459 0 c-434 0 -462 1 -525 21 -119 36 -192 134 -167 224 20 75 75 122 179 156 52 16 104 18 603 18 519 1 550 0 611 -19z m-1202 -985 c0 -59 -32 -154 -74 -219 -45 -69 -106 -122 -185 -160 -64 -30 -71 -31 -246 -37 -100 -3 -189 -10 -200 -16 -126 -69 -117 -253 16 -300 l49 -18 -172 -172 c-95 -95 -178 -173 -184 -173 -7 0 -43 31 -81 69 -114 115 -171 242 -180 407 -11 197 45 344 181 479 91 91 167 136 278 165 65 17 112 19 436 19 l362 1 0 -45z m-121 -871 c106 -80 191 -208 226 -339 19 -75 19 -231 0 -314 -47 -199 -212 -375 -415 -443 -62 -21 -85 -22 -472 -26 l-408 -3 0 46 c0 25 9 74 21 108 41 125 121 215 237 270 67 32 67 32 272 37 192 5 207 7 242 28 41 25 78 91 78 138 -1 48 -34 109 -74 133 -20 13 -60 25 -92 28 l-55 6 183 187 c101 103 186 188 190 188 3 1 33 -19 67 -44z m1365 -1639 c68 -28 141 -95 162 -150 40 -107 -27 -217 -166 -272 -42 -17 -141 -18 -1730 -21 -927 -2 -1709 0 -1739 3 l-54 7 229 229 229 229 1510 -2 c1484 -3 1511 -3 1559 -23z" />
            </g>
          </svg>
        </span>
      </div>
      <p className="text-4xl text-center mb-10">LeetScraper</p>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex items-center py-2">
            <input
              className="appearance-none bg-white border-none w-[300px] text-black mr-3 py-1 px-3 leading-tight focus:outline-none focus:ring-0 rounded-2xl h-10"
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
            <p
              className={`text-sm mt-2 ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
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
    </div>
  );
};

export default SearchComponent;
