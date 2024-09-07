import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const TDLComponent = () => {
  const [toDoList, setToDoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCodeList = async () => {
      try {
        const response = await api.get('/leetscraper/todolist/questions/all/'); 
        const data = response.data;
        setToDoList(data);
      } catch (error) {
        console.error("Error fetching to-do list:", error);
      }
    };
    
    getCodeList(); 
  }, [navigate]);

  return (
    <div>
      <h1>To code list</h1>
      {toDoList.length > 0 ? (
        <ul>
          {toDoList.map((question) => (
            <li key={question.id}>
              <h2>{question.question_title}</h2>
              <p>Difficulty: {question.difficulty}</p>
              <p>Topics: {question.topics}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
};

export default TDLComponent;
