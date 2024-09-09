import Form from "../components/Form";
import Header from "../components/Header";
import LoginItem from "../components/LoginItem";

function Login() {
  return (
    <div>
      <Header />
      <div className="w-full md:w-5/6 lg:w-3/4 flex flex-col lg:flex-row md:rounded-md mx-auto bg-black/20 backdrop-blur-md mt-36 shadow">
        <div className="p-16 flex flex-row justify-center w-full">
          <div className="flex flex-col flex-1 justify-center text-center">
            <h1>Welcome back!</h1>
            <Form route="/leetscraper/token/" method="login" className="text-black"/>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <LoginItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
