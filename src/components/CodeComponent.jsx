import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import CodeEditor from "./CodeEditor";

const CodeComponent = () => {
  const [codeQuestion, setCodeQuestion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const showPage = async () => {
      try {
        const response = await api.get(`/leetscraper/todolist/questions/${id}/`);
        setCodeQuestion(response.data);
      } catch (error) {
        console.log("Error fetching the question:", error);
      }
    };

    showPage();
  }, [id]);

  if (!codeQuestion) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-4xl">{codeQuestion?.question_title}</h2>
        <CodeEditor/>
      <p>
        Notes and youtube suggestions go below here
      </p>
    </div>
  );
};

export default CodeComponent;
