"use client";

import { useState } from "react";
import { useAuth } from "@/_contexts/AuthContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000";
