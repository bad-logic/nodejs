import { channel, subscribe } from 'node:diagnostics_channel';

const myCh = channel('diagnostics:metrics');
subscribe('diagnostics:metrics', (message, channel) => {
  console.log(`[Channel:${channel}][Message]:${message}`);
});
myCh.publish('hey this is my message');
