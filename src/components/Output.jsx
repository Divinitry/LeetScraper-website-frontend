import { executeCode } from "../pistionapi";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import api from "../api";

const Output = ({
  editorRef,
  language,
  codeQuestion,
  setFeedback,
  setUserCode,
  id,
  startedTyping,
}) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

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
      setIsDisabled(false);
    } catch (error) {
      console.error("Error during code execution:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during code execution.";

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

      const response = await api.post(
        "/leetscraper/api/chatgptapi/feedback",
        bodyObject
      );

      const feedbackData = response.data;

      const codeObject = {
        code: currentCode,
        chatgpt_response: feedbackData.feedback || "No feedback available",
        ratings: feedbackData.rating || 0,
      };

      await api.post(
        `/leetscraper/todolist/questions/${id}/codesolutions/create/`,
        codeObject
      );

      setFeedback(feedbackData);
      setIsDisabled(true);

      console.log("Feedback:", feedbackData.feedback);
      console.log("Rating:", feedbackData.rating);
      toast.success("Code saved successfully!");
    } catch (error) {
      console.log("Error in handleSave:", error);
      toast.error("Failed to save the code.");
    }
  };

  return (
    <div className="w-1/2 relative">
      <div className="flex flex-row space-x-[1px]">
        <button
          className={`mb-4 inline-flex justify-center gap-x-1.5 rounded-l-md bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/20 h-[38px] ${
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
            <>
              <PlayArrowIcon style={{ fontSize: "22px" }} />
              Run Code
            </>
          )}
        </button>
        <div
          className={`text-green-400 mb-4 inline-flex justify-center items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold h-[38px] ${
            isDisabled || startedTyping 
              ? "bg-white/10 cursor-not-allowed"
              : "bg-white/15 hover:bg-white/20"
          }`}
        >
          <button
            className={`flex items-center ${
              isDisabled || startedTyping 
                ? "cursor-not-allowed text-white/40"
                : "text-green-400"
            }`}
            onClick={handleSave}
            disabled={isDisabled || startedTyping}
          >
            <CloudUploadOutlinedIcon
              style={{ fontSize: "22px" }}
              className={`mr-2 ${
                isDisabled || startedTyping 
                  ? "text-white/40"
                  : "text-green-400"
              }`}
            />
            Save & Feedback
          </button>
        </div>
      </div>

      <div
        className={`h-[72vh] overflow-scroll p-2 rounded-[4px] outline bg-darkGrey ${
          isError ? "text-red-600 border-red-600" : "outline-white/20"
        } ${!output ? "flex justify-center items-center" : ""}`}
      >
        {output ? (
          output.map((line, index) => <p key={index}>{line}</p>)
        ) : (
          <p className="text-gray-500">You must run your code first</p>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default Output;
