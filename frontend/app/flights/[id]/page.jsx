import FlightDetailClient from "@/_components/FlightDetailClient";

const BACKEND_URL = "http://backend:4000";

async function getFlight(id) {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/flights/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();


  if (!res.ok) {
    throw new Error(
      data.message || "Error al obtener el vuelo"
    );
  }

  return data.data || data;
}

export default async function FlightPage({
  params,
}) {
  const { id } = await params;

  const flight = await getFlight(id);

  return (
    <FlightDetailClient
      flight={flight}
    />
  );
}
