import FlightsListClient from "../_components/FlightsListClient";
export const revalidate = 60;

const BACKEND_URL = "http://backend:4000";

console.log(BACKEND_URL);

async function getFlights() {
  const res = await fetch(`${BACKEND_URL}/api/v1/flights`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Error obteniendo vuelos");
  }

  return res.json();
}

export default async function Page() {
  const flights = await getFlights();

  return (
    <main style={{ padding: "20px" }}>
      <h1>Flights</h1>

      <FlightsListClient initialFlights={flights.data ?? []} />
    </main>
  );
}
