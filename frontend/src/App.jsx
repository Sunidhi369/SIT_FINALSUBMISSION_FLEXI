import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const affirmations = [
    "I am becoming the best version of myself.",
    "I choose peace over worry.",
    "Every day, I am growing and glowing.",
    "I deserve happiness, calm, and love.",
    "Everything is unfolding exactly as it should.",
    "My heart and mind are aligned with positivity.",
    "I am proud of how far I’ve come.",
    "I am learning, healing, and evolving every day.",
    "Good things are flowing into my life.",
    "My energy is calm, clear, and confident."
  ];

  const [current, setCurrent] = useState(0);

  const newAffirmation = () => {
    setCurrent(Math.floor(Math.random() * affirmations.length));
  };

  return (
    <Router>
      {/* NAVBAR */}
      <nav className="w-full py-4 px-8 flex justify-between items-center shadow bg-white">
        <Link
          to={token ? "/" : "/login"}
          className="text-2xl font-semibold hover:opacity-80 transition"
        >
          ✨ Daily Affirmations
        </Link>

        <div className="space-x-4 flex items-center">
          {token ? (
            <>
              <span className="text-gray-700 text-lg">
                Hello, <strong>@{username}</strong>
              </span>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-100 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="text-center mt-20 px-4">
                <h1 className="text-4xl font-semibold mb-6 text-gray-800">
                  🌸 Daily Affirmation
                </h1>

                <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 max-w-xl mx-auto">
                  <p className="text-xl text-gray-700 leading-relaxed mb-4">
                    {affirmations[current]}
                  </p>

                  <button
                    onClick={newAffirmation}
                    className="mt-6 px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
                  >
                    New Affirmation 🌿
                  </button>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
