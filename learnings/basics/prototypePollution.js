const data = JSON.parse('{"__proto__": {"poll": true},"status": "rejected"}');

const fan = Object.assign({ name: 'jane' }, data); // injects poll property
console.log(fan.hasOwnProperty('name'));
console.log({ data, fan: fan.poll });

const h = Object.assign({ name: 'bob' }, JSON.parse('{"__proto__": null}'));
console.log(h.hasOwnProperty('name')); // error since proto is null
console.log({ h });
