import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import CodeEditor from "./CodeEditor";
import Notes from "./Notes";
import VideoSuggestions from "./VideoSuggestions";
import Feedback from "./Feedback";
import CodeHistory from "./CodeHistory";
import CodeBodyDropDown from "./CodeBodyDropDown";

const CodeComponent = () => {
  const [codeQuestion, setCodeQuestion] = useState(null);
  const [difficultyColour, setDifficultyColour] = useState("text-green-400");
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
    <div className="min-h-screen flex flex-col pt-24">
      <CodeBodyDropDown codeQuestion={codeQuestion} difficultyColour={difficultyColour}/>
      <CodeEditor />
      {/* <Feedback codeQuestion={codeQuestion}/>
      <CodeHistory codeQuestion={codeQuestion}/> */}
      <Notes id={id}/>
      {/* <VideoSuggestions codeQuestion={codeQuestion}/> */}
    </div>
  );
};

export default CodeComponent;
