import { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import ProgressBar from "progressbar.js";
import api from "../api";
import LineGraph from "./LineGraph";

const CodeHistory = ({ codeQuestion, feedback, id, userCode }) => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [attemptsPerPage] = useState(2);
  const progressRef = useRef(null);
  const progressBarInstance = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(
          `/leetscraper/todolist/questions/${id}/codesolutions/`
        );
        const data = response.data;
        setHistory(data);
      } catch (error) {
        console.log("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [feedback, userCode, id]);

  useEffect(() => {
    const getAverage = () => {
      if (history.length > 0) {
        const totalRatings = history.reduce(
          (sum, attempt) => sum + attempt.ratings,
          0
        );
        const avgRating = totalRatings / history.length;
        setAverageRating(Math.ceil(avgRating));
      }
    };

    getAverage();
  }, [history]);

  useEffect(() => {
    if (progressRef.current) {
      if (!progressBarInstance.current) {
        progressBarInstance.current = new ProgressBar.Circle(
          progressRef.current,
          {
            strokeWidth: 6,
            color: "#00FF00",
            trailColor: "#eee",
            trailWidth: 1,
            easing: "easeInOut",
            duration: 1400,
            text: {
              value: "",
              alignToBottom: true,
            },
            from: { color: "#FFEA82" },
            to: { color: "#ED6A5A" },
            step: (state, bar) => {
              bar.path.setAttribute("stroke", state.color);
              const value = Math.round(bar.value() * 10);
              if (value === 0) {
                bar.setText("");
              } else {
                bar.setText(`${value}/10`);
              }
              bar.text.style.color = state.color;
            },
            svgStyle: {
              width: "100%",
              height: "100%",
            },
          }
        );
      }

      progressBarInstance.current.animate(averageRating / 10);
    }

    return () => {
      if (progressBarInstance.current) {
        progressBarInstance.current.destroy();
        progressBarInstance.current = null;
      }
    };
  }, [averageRating]);

  const indexOfLastAttempt = currentPage * attemptsPerPage;
  const indexOfFirstAttempt = indexOfLastAttempt - attemptsPerPage;
  const currentAttempts = history.slice(
    indexOfFirstAttempt,
    indexOfLastAttempt
  );
  const totalPages = Math.ceil(history.length / attemptsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 w-full mb-6 lg:mb-0">
          <LineGraph history={history} />
        </div>

        <div className="flex flex-col justify-center items-center w-full border bg-white/5 border-white/20 text-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Code Analysis Info</h2>

          <table className="table-auto w-full text-left mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center text-white/70 font-normal">
                  Total Attempts
                </th>
                <th className="px-4 py-2 text-center text-white/70 font-normal">
                  Rating Average
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center text-3xl">
                  {history.length}
                </td>
                <td className="px-4 py-2">
                  <div
                    ref={progressRef}
                    className="w-full h-32 max-w-xs mx-auto"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {history.length > 0 ? (
        <>
          <ul className="space-y-6">
            {currentAttempts.map((attempt, index) => (
              <li key={index} className="p-6 rounded-lg shadow-md bg-white/10">
                <h1 className="text-xl font-semibold mb-2">
                  Attempt {indexOfFirstAttempt + index + 1}
                </h1>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <strong>Code:</strong>
                    <AceEditor
                      value={attempt.code}
                      readOnly={true}
                      name={`attempt_code_${index}`}
                      editorProps={{ $blockScrolling: true }}
                      setOptions={{
                        useWorker: false,
                      }}
                      width="100%"
                      height="300px"
                      theme="clouds_midnight"
                      className="text-white"
                    />
                  </div>

                  <div className="w-1/2">
                    <strong>Feedback:</strong>
                    <div className="block p-2 rounded overflow-auto h-[300px]">
                      {attempt.chatgpt_response}
                    </div>
                  </div>
                </div>

                <p className="mt-2">
                  <strong>Rating:</strong>{" "}
                  <span className="block p-2 rounded">{attempt.ratings}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-8">
            <nav aria-label="Page navigation">
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
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
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
