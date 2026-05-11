"use client";

import { useState } from "react";
import { useAuth } from "@/_contexts/AuthContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000";

export default function FlightDetailClient({ flight }) {
  const { isAuthenticated, token } = useAuth();

  const router = useRouter();

  const [origin, setOrigin] = useState(flight.origin);
  const [destination, setDestination] = useState(flight.destination);
  const [status, setStatus] = useState(flight.status);

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");

  const handleUpdate = async () => {
    try {

    } catch (err) {

    } finally {

    }
  }
}
