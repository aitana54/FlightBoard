import FlightsListClient from "../_components/FlightsListClient";
//export const revalidate = 60;

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:4000';

async function getFlights() {
  const res = await fetch(`${API}/api/v1/flights`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los vuelos');
  }

  return res.json();
}


export default async function Page() {
  const response = await getFlights();
  const flights = response.data;

   return (
    <main style={{ padding: 20 }}>
      <h1>FlightBoard</h1>

      <FlightsListClient initialFlights={flights} />
    </main>
  );
}
