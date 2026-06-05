import FlightDetailClient from "@/_components/FlightDetailClient";

const API =
  process.env.NEXT_PUBLIC_API_URL;

async function getFlight(id) {
  const res = await fetch(
    `${API}/api/v1/flights/${id}`,
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
