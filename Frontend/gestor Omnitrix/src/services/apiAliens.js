export async function getAliens(token) {
  // 🔥 Ahora recibe el token como parámetro
  console.log("token desde getAliens", token);

  if (!token) {
    console.warn("🔴 Intento de solicitud sin token. Evitando la petición...");
    throw new Error("Token no disponible");
  }

  const res = await fetch(`http://localhost:8080/aliens`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch aliens");

  const aliensData = await res.json();
  console.log(aliensData);
  return aliensData;
}
