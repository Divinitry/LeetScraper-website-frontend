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
      const response = await api.delete(
        `/leetscraper/todolist/questions/remove/${id}/`
      );
      setToDoList(toDoList.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>To code list</h1>
      {toDoList.length > 0 ? (
        <ul>
          {toDoList.map((codeItem) => (
            <li key={codeItem.id}>
              <a href={`/todolist/code/${codeItem.id}`}>
                <p>{codeItem.question_title}</p>
                <p>{codeItem.difficulty}</p>
              </a>
              <button onClick={() => deleteQuestion(codeItem.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Add some questions with the search bar!</p>
      )}
    </div>
  );
};

export default TDLComponent;
