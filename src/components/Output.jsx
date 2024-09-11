import { executeCode } from "../pistionapi";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      toast.error('No code to execute.');
      return;
    }
  
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      const errorMessage = error.response?.data?.message || 'An error occurred.';
  
      toast.error(errorMessage, {
        duration: 6000,
        position: 'bottom-center',
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2">
      <p className="mb-2 text-lg">Output</p>
      <button
        className={`mb-4 inline-flex justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold border border-green-600 shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-50 ${
          isLoading ? "cursor-not-allowed opacity-50" : "text-green-600"
        }`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-green-600"
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

      <div className={`h-[60vh] p-2 rounded-[4px] ${isError ? 'text-red-600 border-red-600' : 'border-gray-800'}`}>
        {output ?
             output.map(
                (line, index) => <p key={index}>{line}</p>
             ) 
             : 'Click "Run Code" to see the output here'}
      </div>

      <Toaster />
    </div>
  );
};

export default Output;
