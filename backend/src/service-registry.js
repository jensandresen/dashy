import EventDispatcher from "./event-dispatcher";

export const eventDispatcher = new EventDispatcher();
eventDispatcher.registerChannel({
  send: (type, payload) => console.log(`Event "${type}": `, payload),
});
