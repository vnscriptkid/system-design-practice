import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./auth";

localStorage.debug = "*";

function getWsPort() {
  const wsPorts = [8082, 8083];
  const randomIdx = Math.floor(Math.random() * 2);
  return wsPorts[randomIdx];
}

const SOCKET_URL = `ws://localhost:${getWsPort()}`;

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      reconnectionDelayMax: 10000,
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        userId: user && user.id,
      },
    });

    setSocket(socket);

    return () => socket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
