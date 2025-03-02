export async function getAliens(token) {
  // 🔥 Ahora recibe el token como parámetro

  if (!token) {
    console.warn("🔴 Intento de solicitud sin token. Evitando la petición...");
    throw new Error("Token no disponible");
  }

  console.log("token", token);

  const res = await fetch(`http://localhost:8080/aliens`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch aliens");

  const aliensData = await res.json();
  return aliensData;
}
