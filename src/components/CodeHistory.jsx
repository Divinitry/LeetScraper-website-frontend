import { useState, useEffect } from "react";
import api from "../api";
import LineGraph from "./LineGraph";

const CodeHistory = ({ codeQuestion, feedback, id, userCode }) => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [attemptsPerPage] = useState(2);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(
          `/leetscraper/todolist/questions/${id}/codesolutions/`
        );
        const data = response.data;
        setHistory(data);
      } catch (error) {
        console.log('Error fetching history:', error);
      }
    };
  
    fetchHistory();
  }, [feedback, userCode, id]); 

  const indexOfLastAttempt = currentPage * attemptsPerPage;
  const indexOfFirstAttempt = indexOfLastAttempt - attemptsPerPage;
  const currentAttempts = history.slice(indexOfFirstAttempt, indexOfLastAttempt);
  const totalPages = Math.ceil(history.length / attemptsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6">
      <LineGraph history={history} />
      {history.length > 0 ? (
        <>
          <ul className="space-y-6">
            {currentAttempts.map((attempt, index) => (
              <li key={index} className="p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-semibold mb-2">Attempt {indexOfFirstAttempt + index + 1}</h1>
                <div className="mb-2">
                  <strong>Code:</strong>
                  <pre className="bg-white/10 text-white p-4 rounded overflow-x-auto">
                    <code>{attempt.code}</code>
                  </pre>
                </div>
                <p className="mb-2">
                  <strong>Feedback:</strong> <span className="block p-2 rounded">{attempt.chatgpt_response}</span>
                </p>
                <p className="mb-2">
                  <strong>Rating:</strong> <span className="block p-2 rounded">{attempt.ratings}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-8">
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                  <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-white bg-transparent border border-e-0 border-gray-500 rounded-s-lg hover:bg-white/20 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <button
                      onClick={() => handlePageClick(index + 1)}
                      className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-500 hover:bg-white/20 ${
                        currentPage === index + 1
                          ? "z-10 text-white bg-transparent"
                          : "text-white bg-transparent"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-white bg-transparent border border-gray-500 rounded-e-lg hover:bg-white/20 ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No attempts yet.</p>
      )}
    </div>
  );
};

export default CodeHistory;
