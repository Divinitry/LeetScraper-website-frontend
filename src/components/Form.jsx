import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", confirmPassword: "" }); 
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ username: "", password: "", confirmPassword: "" });

    if (method === "register" && password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match!",
      }));
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const responseErrors = error.response.data;
      if (method === "login") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: responseErrors.detail || "Incorrect username or password",
        }));
      } else if (method === "register") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: responseErrors.username || "",
          password: responseErrors.password || "",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center"
    >
      <div className="w-3/5 mb-3">
        <input
          className={`appearance-none text-white block w-full bg-transparent border-b py-3 px-4 leading-tight focus:outline-none focus:bg-stone-900 focus:border-gray-500 ${
            errors.username ? "border-red-500" : ""
          }`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-2">{errors.username}</p>
        )}
      </div>

      <div className="w-3/5 mb-3">
        <input
          className={`appearance-none text-white block w-full bg-transparent border-b py-3 px-4 leading-tight focus:outline-none focus:bg-stone-900 focus:border-gray-500 ${
            errors.password ? "border-red-500" : ""
          }`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-2">{errors.password}</p>
        )}
      </div>

      {method === "register" && (
        <div className="w-3/5 mb-3">
          <input
            className={`appearance-none text-white block w-full bg-transparent border-b py-3 px-4 leading-tight focus:outline-none focus:bg-stone-900 focus:border-gray-500 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
          )}
        </div>
      )}

      <div className="pt-10">
        <button
          type="submit"
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none mx-auto"
          disabled={loading}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
            {loading ? "Loading..." : name}
          </span>
        </button>
      </div>
    </form>
  );
}

export default Form;
