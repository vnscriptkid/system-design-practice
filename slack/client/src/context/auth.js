import React, { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token && refreshToken) {
      try {
        decode(token);
        const { exp, user: _user } = decode(refreshToken);
        if (Date.now() / 1000 > exp) {
          setUser(null);
        } else {
          setUser(_user);
        }
      } catch (err) {
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
