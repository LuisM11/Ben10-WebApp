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
    <div className="flex min-h-screen justify-start items-start bg-[url('/FondoBen10.jpg')] bg-cover bg-center">
      <div className="mt-20 ml-20 max-w-md w-full h-auto rounded-lg bg-black p-6 shadow-md border border-[#30f301]">
        <h2 className="mb-4 text-center text-2xl font-bold text-[#30f301]">Iniciar Sesión</h2>
        {error && <p className="mb-4 text-center text-white">{error}</p>}
    
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full rounded-lg border border-[#30f301] bg-transparent p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#30f301]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-lg border border-[#30f301] bg-transparent p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#30f301]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#30f301] px-4 py-2 text-black font-bold transition-colors hover:bg-green-600"
          >
            Login
          </button>
        </form>
    
        <button
          onClick={() => setShowRegister(true)}
          className="mt-4 w-full text-center text-[#30f301] hover:text-green-400"
        >
          Crear nueva cuenta
        </button>
    
        {showRegister && <RegisterPopup onClose={() => setShowRegister(false)} />}
      </div>
    </div>
  );
}

export default Login;
