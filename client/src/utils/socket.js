import { io } from "socket.io-client"

const SOCKET_URL = "https://myntra-backend-he3a.onrender.com"

let socket

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    })
  }
  return socket
}
