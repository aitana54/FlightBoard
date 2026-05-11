import FlightDetailClient from "@/_components/FlightDetailClient";

const API = process.env.NEXT_PUBLIC_API_URL ??
"http://127.0.0.1:4000";


async function getFlight(id) {
  const res = await fetch(`${API}/api/v1/flights/${id}`);

  if (!res.ok) {
    throw new Error('Error al obtener el vuelo');
  }

  return res.json();
}

export default async function FlightPage({ params }) {
  const flight = await getFlight(params.id);

  return <FlightDetailClient flight={flight} />;
}
