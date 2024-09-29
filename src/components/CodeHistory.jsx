import { useState, useEffect } from "react";
import api from "../api";
import LineGraph from "./LineGraph";

const CodeHistory = ({ codeQuestion, feedback, id, userCode }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(
          `/leetscraper/todolist/questions/${id}/codesolutions/`
        );
        const data = response.data;
        setHistory(data);
      } catch (error) {
        console.log('Error fetching history:', error);
      }
    };
  
    fetchHistory();
  }, [feedback, userCode, id]); 
  

  return (
    
    <div className="container mx-auto p-6">
      <LineGraph history={history}/>
      {history.length > 0 ? (
        <ul className="space-y-6">
          {history.map((attempt, index) => (
            <li key={index} className="p-6 rounded-lg shadow-md">
              <h1 className="text-xl font-semibold mb-2">Attempt {index + 1}</h1>
              <div className="mb-2">
                <strong>Code:</strong>
                <pre className="bg-white/10 text-white p-4 rounded overflow-x-auto">
                  <code>{attempt.code}</code>
                </pre>
              </div>
              <p className="mb-2">
                <strong>Feedback:</strong> <span className="block p-2 rounded">{attempt.chatgpt_response}</span>
              </p>
              <p className="mb-2">
                <strong>Rating:</strong> <span className="block p-2 rounded">{attempt.ratings}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No attempts yet.</p>
      )}
    </div>
  );  
};

export default CodeHistory;
