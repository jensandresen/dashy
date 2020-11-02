import io from "socket.io-client";
const socket = io();

export function subscribe(eventName, handler) {
  socket.on(eventName, handler);
  const unsubscriber = () => socket.off(eventName, handler);
}
