import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const TDLComponent = () => {
  const [toDoList, setToDoList] = useState([]);
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

  const deleteQuestion = async (id) => {
    try {
      await api.delete(`/leetscraper/todolist/questions/remove/${id}/`);
      setToDoList(toDoList.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-4 pt-40">
      <h1 className="text-4xl mb-8">To Code List</h1>

      {toDoList.length > 0 ? (
        <ul className="w-full max-w-lg">
          {toDoList.map((codeItem) => (
            <li key={codeItem.id} className="flex items-center justify-between text-white p-4 mb-4 rounded-lg shadow-lg">
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
      ) : (
        <p className="text-gray-400 text-lg">Add some questions with the search bar!</p>
      )}
    </div>
  );
};

export default TDLComponent;
