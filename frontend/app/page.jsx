import FlightsListClient from "../_components/FlightsListClient";

export const revalidate = 60;

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:4000';

async function getFlights() {
  const res = await fetch(`${API}/api/v1/flights`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los vuelos');
  }

  const data = await res.json();

  return data.data;
}


export default async function Page() {
  const flights = await getFlights();


   return (
    <main style={{ padding: 20 }}>
      <h1>FlightBoard</h1>

      <FlightsListClient initialFlights={flights} />
    </main>
  );
}
