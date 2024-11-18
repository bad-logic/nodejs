import { Buffer } from 'node:buffer';

console.log({ buffer: Buffer.alloc(10, 1) });
const buffer = Buffer.allocUnsafe(10);
console.log({ buffer });
buffer.fill(10);
console.log({ buffer });

console.log({ buffer: Buffer.from([1, 2, 3]) });
console({ buffer: Buffer.from('hello there') });
