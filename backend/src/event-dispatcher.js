export default class EventDispatcher {
  constructor() {
    this.channels = [];

    this.registerChannel = this.registerChannel.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  registerChannel(channel) {
    this.channels.push(channel);
  }

  dispatch(eventType, eventPayload) {
    this.channels.forEach((channel) => channel.send(eventType, eventPayload));
  }
}
