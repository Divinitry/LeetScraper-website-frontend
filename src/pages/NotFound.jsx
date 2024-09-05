import Header from "../components/Header"

function NotFound() {
    return(
        <div>
            <Header/>
            <h1 className="pt-60">Not Found</h1>
            <p>The page you're looking for doesn't exist!</p>
        </div>
    )
}

export default NotFound