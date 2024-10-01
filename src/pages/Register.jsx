import Form from "../components/Form";

function Register() {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-1/2 flex flex-col lg:flex-row md:rounded-md mx-auto bg-black/20 backdrop-blur-md shadow items-center">
          <div className="p-16 flex flex-col lg:flex-row justify-center w-full">
            <div className="flex flex-col flex-1 justify-center text-center lg:w-1/2 w-full bg-stone-950 py-20">
              <h1 className="text-4xl font-bold pb-10">Create your account!</h1>
              <Form route="/leetscraper/user/register/" method="register" className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
