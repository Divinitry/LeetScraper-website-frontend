/*     
make sure you use useHistory for redirecting, use history.push(send them to the page) use this for if they are not authenticated 
and then make sure you are using useEffect to render things automatically and to render things onto a page when u first load, but REMEMBER 
useEffect is used to run code automatically and u can control when it runs by if u leave the array empty or add a function into it (to tell it to render
whenever the function runs). for deleting things you do not need useEffect, only AUTOMATIC CODE, also remember to send cookies to the backend api to 
control user session
*/
import { useEffect, useState } from "react";

const TDLComponent = () => {
    const [toDoList, setToDoList] = useState([]);

    useEffect(() => {
        async function getToDoList() {
            const url = 'http://127.0.0.1:8000/leetscraper/todolist/';
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setToDoList(data);
            } catch (error) {
                console.log(error.message);
            }
        }

        getToDoList(); 
    }, []);

    return (
        <div className="pt-60">
            {toDoList.map((item, index) => (
                <div>
                    <h1 key={index}>{item.name}</h1>
                    <p>{item.created_time}</p>
                </div>
            ))}
        </div>
    );
}

export default TDLComponent;
