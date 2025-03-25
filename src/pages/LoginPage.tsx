import { useNavigate } from "react-router";
import { login } from "../auth";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      // Clear form inputs and navigate to home page on successful login
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      // Clear form inputs and show error message on failed login
      setError("Invalid credential");
      setEmail("");
      setPassword("");
    }
  };
  console.log("pass", password, email);
  return (
    <div className="flex h-screen items-center justify-center  bg-black text-black">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogIn} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="pt-2">
          <span className="font-bold "> Email:</span> hello@gmail.com
        </p>
        <p>
          {" "}
          <span className="font-bold"> Password:</span> hello123
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
