"use client";
import { createContext, useReducer, useContext } from "react";


const AuthContext = createContext;

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
