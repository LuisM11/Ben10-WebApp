import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import RegisterPopup from "../Register.jsx/RegisterPopup";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/app");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-auto">
      {/* Background with character artwork */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/login-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

      {/* Login Form Container - Positioned on the right */}
      <div className="absolute bottom-0 right-0 top-0 flex w-full items-center justify-center md:w-[500px]">
        <div className="m-4 w-full max-w-[350px] rounded-lg border-2 border-white bg-[#c0baba] p-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-800">
            Iniciar Sesión
          </h2>

          {error && <p className="mb-4 text-center text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              className="w-full rounded-lg border border-white bg-[#2a2a2a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full rounded-lg border border-white bg-[#2a2a2a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-white px-4 py-3 text-black transition-transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <button
            onClick={() => setShowRegister(true)}
            className="mt-4 w-full text-center text-black hover:text-white"
          >
            Crear nueva cuenta
          </button>

          {showRegister && (
            <RegisterPopup onClose={() => setShowRegister(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
