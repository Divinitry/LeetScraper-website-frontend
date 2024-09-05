/*     
make sure you use useHistory for redirecting, use history.push(send them to the page) use this for if they are not authenticated 
and then make sure you are using useEffect to render things automatically and to render things onto a page when u first load, but REMEMBER 
useEffect is used to run code automatically and u can control when it runs by if u leave the array empty or add a function into it (to tell it to render
whenever the function runs). for deleting things you do not need useEffect, only AUTOMATIC CODE, also remember to send cookies to the backend api to 
control user session
*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

const TDLComponent = () => {
    const [toDoList, setToDoList] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem(ACCESS_TOKEN); // remember you need to retrieve the access token for each fetch request that you make and pass it in as the bearer 

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
            return;
        }

        async function getToDoList() {
            const url = 'http://127.0.0.1:8000/leetscraper/todolist/';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login');
                        return;
                    }
                    throw new Error('Failed to fetch the to-do list');
                }

                const data = await response.json();
                setToDoList(data);
            } catch (error) {
                console.log(error.message);
            }
        }

        getToDoList(); 
    }, [accessToken, navigate]); 

    return (
        <div className="pt-60">
            {toDoList.length > 0 ? (
                toDoList.map((item, index) => (
                    <div key={index}>
                        <h1>{item.name}</h1>
                        <p>{item.created_time}</p>
                    </div>
                ))
            ) : (
                <p>Loading to-do list...</p> 
            )}
        </div>
    );
}

export default TDLComponent;
