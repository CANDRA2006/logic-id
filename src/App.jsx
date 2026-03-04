import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LangProvider } from "./context/LangContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Play from "./pages/Play";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Community from "./pages/Community";

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#0a0a0a]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/play"
              element={
                <ProtectedRoute>
                  <Play />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:category"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  );
}
