"use client";
import { useState } from "react";
import { useAuth } from "@/_contexts/AuthContext";

export default function Login() {
  const {dispatch} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogin = async () => {
    const res = await fetch(`${API}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { email: data.email},
      token: data.token
    });
  };

  return (
    <div>
      <input onchange={e => setEmail(e.target.value)} />
      <input onchange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
