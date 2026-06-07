import FlightsListClient from "../_components/FlightsListClient";
export const revalidate = 60;

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000";

console.log(API);

async function getFlights() {
  const res = await fetch(`${API}/api/v1/flights`, {
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
