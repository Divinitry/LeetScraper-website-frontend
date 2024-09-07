import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const TDLComponent = () => {
  const [toDoList, setToDoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getToDoList = async () => {
      try {
        const response = await api.get("/leetscraper/todolist/");
        setToDoList(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Failed to fetch the to-do list", error.message);
        }
      }
    };

    getToDoList();
  }, [navigate]);

  return (
    <div className="">
      {toDoList.map((item, index) => (
        <div key={index}>
          <h1>{item.name}</h1>
          <p>Created at: {item.created_time}</p>
          <div>
            <h3>Questions:</h3>
            {item.questions.length > 0 ? (
              item.questions.map((question, qIndex) => (
                <div key={qIndex}>
                  <p>Title: {question.question_title}</p>
                  <p>Difficulty: {question.difficulty}</p>
                  <p>Body: {question.body}</p>
                </div>
              ))
            ) : (
              <p>No questions available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TDLComponent;
