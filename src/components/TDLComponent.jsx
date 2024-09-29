import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const TDLComponent = () => {
  const [toDoList, setToDoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const getCodeList = async () => {
      try {
        const response = await api.get("/leetscraper/todolist/questions/all/");
        const data = response.data;
        setToDoList(data);
      } catch (error) {
        console.error("Error fetching to-do list:", error);
      }
    };

    getCodeList();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = toDoList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(toDoList.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteQuestion = async (id) => {
    try {
      await api.delete(`/leetscraper/todolist/questions/remove/${id}/`);
      setToDoList(toDoList.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-4 pt-28">
      <h1 className="text-4xl mb-8">To Code List</h1>

      {toDoList.length > 0 ? (
        <>
          <ul className="w-full max-w-lg">
            {currentItems.map((codeItem) => (
              <li
                key={codeItem.id}
                className="flex items-center justify-between text-white p-4 mb-4 rounded-lg shadow-lg"
              >
                <div>
                  <a
                    href={`/todolist/code/${codeItem.id}`}
                    className="block text-2xl font-semibold text-white hover:text-gray-400 transition-colors"
                  >
                    {codeItem.question_title}
                  </a>
                  <p className="text-gray-400">Difficulty: {codeItem.difficulty}</p>
                </div>

                <button
                  onClick={() => deleteQuestion(codeItem.id)}
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>

          {toDoList.length > itemsPerPage && (
            <nav aria-label="Page navigation" className="mt-8">
            <ul className="flex items-center -space-x-px h-10 text-base">
              <li>
                <button
                  onClick={handlePrevious}
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
                    onClick={() => handleClick(index + 1)}
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
                  onClick={handleNext}
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
          )}
        </>
      ) : (
        <p className="text-gray-400 text-lg">Add some questions with the search bar!</p>
      )}
    </div>
  );
};

export default TDLComponent;
