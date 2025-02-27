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
    <div className="mx-auto mt-20 max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-bold">Iniciar Sesión</h2>
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <button
        onClick={() => setShowRegister(true)}
        className="mt-4 w-full text-center text-blue-500 hover:text-blue-700"
      >
        Crear nueva cuenta
      </button>

      {showRegister && <RegisterPopup onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default Login;
