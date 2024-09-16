import Form from "../components/Form"
import Header from "../components/Header"

function Register() {
    return(
        <div className="min-h-screen flex flex-col justify-center">
            <Form route="/leetscraper/user/register/" method="register"/>
        </div>
    )
}

export default Register