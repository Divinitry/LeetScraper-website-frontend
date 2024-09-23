import { useState, useEffect } from "react"
import api from "../api"

const CodeHistory = ({codeQuestion, feedback, id, userCode}) => {
    const [history, setHistory] = useState([])

    useEffect(() =>{
        const saveToHistory = async () => {
            const codeObject = {
                code: userCode,
                chatgpt_response: feedback.feedback, 
                ratings: feedback.rating
            }
            try{
                await api.post(`/leetscraper/todolist/questions/${id}/codesolutions/create/`, codeObject);
                fetchHistory()
            }catch(error){
                console.log(error)
            }
        }

        const fetchHistory = async () => {
            try {
                const response = await api.get(`/leetscraper/todolist/questions/${id}/codesolutions/`)
                const data = response.data 
                setHistory(data)
            } catch (error) {
                console.log(error)
            }
        }

        if (userCode && feedback) {
            saveToHistory();
        }

        fetchHistory()
    }, [feedback, userCode])

    return(
        <div>
            {history.length > 0 ? (
                <ul>
                    {history.map((attempt, index) => {
                        return(
                        <li key={index}>
                            <p><strong>Code:</strong> {attempt.code}</p>
                            <p><strong>Feedback:</strong> {attempt.chatgpt_response}</p>
                            <p><strong>Rating:</strong> {attempt.ratings}</p>
                        </li>
                        )
                    })}
                </ul>
            ) : <p>No attempts yet.</p>}
        </div>
    )
}

export default CodeHistory