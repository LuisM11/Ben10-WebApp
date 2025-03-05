import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterPopup({ onClose }) {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(formData.username, formData.password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border-2 border-white bg-[#c0baba] p-8">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-2 text-gray-700 transition-colors hover:text-black"
        >
          ×
        </button>

        <h2 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Registro
        </h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full rounded-lg border border-white bg-[#2a2a2a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-lg border border-white bg-[#2a2a2a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full rounded-lg border border-white bg-[#2a2a2a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-white px-4 py-3 text-black transition-transform hover:scale-105"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
