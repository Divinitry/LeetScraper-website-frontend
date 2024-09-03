

/*     
make sure you use useHistory for redirecting, use history.push(send them to the page) use this for if they are not authenticated 
and then make sure you are using useEffect to render things automatically and to render things onto a page when u first load, but REMEMBER 
useEffect is used to run code automatically and u can control when it runs by if u leave the array empty or add a function into it (to tell it to render
whenever the function runs). for deleting things you do not need useEffect, only AUTOMATIC CODE, also remember to send cookies to the backend api to 
control user session
*/



const TDLComponent = () => {
    return(
        <div className="pt-60">
            <h1>To Code List</h1>
        </div>
    )
}

export default TDLComponent