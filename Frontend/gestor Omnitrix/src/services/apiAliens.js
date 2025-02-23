const API_URL = "http://localhost:8080";

export async function getAliens() {
  const res = await fetch(`${API_URL}/aliens`);

  if (!res.ok) throw new Error("Failed to fetch aliens");

  // Ajusta para extraer la propiedad correcta:
  const aliensData = await res.json();
  console.log(aliensData);

  return aliensData; // aquí devolvemos el array de aliens
}
