import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getUrl } from "util";
let socket;

const useSocket = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    socketInitializer();
    return () => socketInitializer;
  }, []);

  const socketInitializer = async () => {
    await axios.get(getUrl() + "/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("join-room", "room1"); // Joining room1 for demonstration
    });

    socket.on("update-input", (msg) => {
      setResponse(msg);
    });
  };

  const sendMessage = (name, score) => {
    socket.emit("input-change", { name, score });
  };

  return { response, sendMessage };
};

export default useSocket;
