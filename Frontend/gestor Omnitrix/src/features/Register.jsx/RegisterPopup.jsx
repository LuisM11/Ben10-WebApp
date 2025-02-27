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

  // Cerrar al hacer click fuera del formulario (mismo código)
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
      <div
        ref={popupRef}
        className="relative min-w-[300px] rounded-lg bg-white p-8 shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-2 text-gray-500 transition-colors hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="mb-4 text-center text-2xl font-bold">Registro</h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
