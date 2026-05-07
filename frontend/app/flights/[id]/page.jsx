const API = process.env.NEXT_PUBLIC_API_BASE_URL ??
"http://127.0.0.1:4000";


async function getFlight(id) {
  const res = await fetch(`${API}/api/v1/flights/${id}`);

  if (!res.ok) {
    throw new Error('Error al obtener el vuelo');
  }

  return res.json();
}
