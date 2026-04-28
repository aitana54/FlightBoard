"use client";
import { createContext } from "react";


const AuthContext = createContext;

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

