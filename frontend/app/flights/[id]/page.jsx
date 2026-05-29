import FlightDetailClient from "@/_components/FlightDetailClient";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:4000";

async function getFlight(id) {
  const res = await fetch(
    `${API}/api/v1/flights/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Error al obtener el vuelo"
    );
  }

  const data = await res.json();

  return data.data;
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
