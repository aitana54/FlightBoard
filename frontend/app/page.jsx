import FlightsListClient from "../_components/FlightsListClient";
import { FlightsProvider } from "../_contexts/FlightsContext";

export const revalidate = 60;


async function getFlights() {
  const res = await fetch(`http://backend:4000/api/v1/flights`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error al obtener los vuelos');
  }

  return Array.isArray(data) ? data : data.data ?? [];
}


export default async function Page() {
  const flights = await getFlights();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">FlightBoard</h1>

      <FlightsProvider initialFlights={flights}>
        <FlightsListClient />
      </FlightsProvider>
    </main>
  );
}
