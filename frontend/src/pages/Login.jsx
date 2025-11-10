import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", {
      identifier,
      password,
    });

    if (res.data.error === "User not found") {
      setMessage(
        <p className="text-red-600 text-center">
          No account found. Please{" "}
          <Link to="/signup" className="underline text-blue-600">
            Sign Up
          </Link>{" "}
          first 💗
        </p>
      );
      return;
    }

    if (res.data.error === "Incorrect password") {
      setMessage(<p className="text-red-600 text-center">Incorrect password ❌</p>);
      return;
    }

    if (res.data.token) {
      setMessage(<p className="text-green-600 text-center">Login successful ✅</p>);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      setTimeout(() => navigate("/"), 900);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-center mb-6">🔐 Login</h2>

        {message && <div className="mb-4">{message}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Username or Email</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 ring-gray-400 outline-none"
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:ring-2 ring-gray-400 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
