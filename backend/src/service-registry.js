import EventDispatcher from "./event-dispatcher";

export const eventDispatcher = new EventDispatcher();
eventDispatcher.registerChannel({
  send: (type, payload) => console.log(`Event "${type}": `, payload),
});

setInterval(() => {
  eventDispatcher.dispatch("new random number", {
    value: new Date().getTime(),
  });
}, 2000);
