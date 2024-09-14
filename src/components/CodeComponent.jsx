import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import CodeEditor from "./CodeEditor";

const CodeComponent = () => {
  const [codeQuestion, setCodeQuestion] = useState(null);
  const [difficultyColour, setDifficultyColour] = useState("text-green-400")
  const { id } = useParams();

  useEffect(() => {
    const showPage = async () => {
      try {
        const response = await api.get(
          `/leetscraper/todolist/questions/${id}/`
        );
        setCodeQuestion(response.data);

        if (response.data.difficulty.toLowerCase() === "medium") {
          setDifficultyColour("text-yellow-500");
        } else if (response.data.difficulty.toLowerCase() === "hard") {
          setDifficultyColour("text-red-600");
        }
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
      <div className="code-question-page">
        <h2 className="text-4xl">{codeQuestion?.question_title}</h2>
        <p className={difficultyColour}>{codeQuestion.difficulty}</p>
        <p>{codeQuestion.topics}</p>
        <p>{codeQuestion.code_stubs}</p>
        <div dangerouslySetInnerHTML={{ __html: codeQuestion.hints[0] }} />
        <div
          dangerouslySetInnerHTML={{ __html: codeQuestion.body }}
          className="bg-white/5 py-5 px-5 text-red-"
        />
      </div>
      <CodeEditor />
      <p>Notes and youtube suggestions go below here</p>
    </div>
  );
};

export default CodeComponent;
