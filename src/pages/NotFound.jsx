import Header from "../components/Header";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-extrabold text-white bg-black/50 px-10 py-5 rounded-lg backdrop-blur-md shadow-lg">
            No Page Found
          </h1>
          <p className="text-xl text-gray-400 mt-4">
            The page you're looking for doesn't exist!
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
