import { executeCode } from "../pistionapi";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../api";

const Output = ({
  editorRef,
  language,
  codeQuestion,
  setFeedback,
  setUserCode,
  id,
  userCode
}) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentCode, setCurrentCode] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue().trim();
    if (!sourceCode) {
      toast.error("No code to execute.");
      return;
    }

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      console.log("Error response:", error.response);
      const errorMessage =
        error.response?.data?.message || "An error occurred.";

      toast.error(errorMessage, {
        duration: 6000,
        position: "bottom-center",
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
    setCurrentCode(sourceCode);
  };

  const handleSave = async () => {
    try {
      setUserCode(currentCode);
  
      const bodyObject = {
        question_title: codeQuestion.question_title,
        question_topics: codeQuestion.topics,
        user_code: currentCode,
      };

      const response = await api.post("/leetscraper/api/chatgptapi/", bodyObject);

      const feedbackData = response.data;
  
      const codeObject = {
        code: currentCode, 
        chatgpt_response: feedbackData.feedback, 
        ratings: feedbackData.rating,
      };

      if(codeObject.chatgpt_response === "Nice code, but it seems unrelated to the question."){
        return
      } else{
        await api.post(
          `/leetscraper/todolist/questions/${id}/codesolutions/create/`,
          codeObject
        );
      }
      
      setFeedback(feedbackData);
      
      console.log("Feedback:", feedbackData.feedback);
      console.log("Rating:", feedbackData.rating);
    } catch (error) {
      console.log("Error in handleSave:", error);
    }
  };
  

  return (
    <div className="w-1/2 relative">
      <p className="mb-2 text-lg">Output</p>
      <button
        className={`mb-4 inline-flex justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold border border-purple-800 shadow-sm ring-1 ring-inset ring-purple-600 hover:bg-white/5 h-[38px] ${
          isLoading ? "cursor-not-allowed opacity-50" : "text-white"
        }`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        ) : (
          "Run Code"
        )}
      </button>

      <div
        className={`h-[72vh] overflow-scroll p-2 rounded-[4px] outline ${
          isError ? "text-red-600 border-red-600" : "border-gray-800"
        }`}
      >
        {output
          ? output.map((line, index) => <p key={index}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>

      <Toaster />

      {currentCode && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            className="bg-emerald-500 p-1"
            onClick={() => {
              handleSave(currentCode)
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Output;
