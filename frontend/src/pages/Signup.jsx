import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const isValidEmail = (email) => {
    // ✅ Email must contain text + @ + domain
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage("❌ Please enter a valid email address");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      username,
      name,
      email,
      password,
    });

    setMessage(res.data.error || "Signup successful 🎉");

    if (res.data.error) return;

    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-center mb-6">✨ Create Account</h2>

        {message && <p className="text-center mb-3 text-gray-700">{message}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email (example@gmail.com)"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
