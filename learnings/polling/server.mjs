import http from 'node:http';
import fs from 'node:fs';

const messages = [];

const clients = [];
const port = 8080;

function getPayload(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (data) => {
      body += data;
    });
    request.on('end', () => {
      const data = JSON.parse(body);
      return resolve(data);
    });
  });
}

const index = fs.readFileSync('./index.html');

async function deliverMessageToPending(message) {
  let i = 0;
  const target = clients.length;
  const count = messages.length;
  while (i < target) {
    const response = clients.pop();
    response.end(JSON.stringify({ msgs: [message], cursor: count }));
    i++;
  }
}

const server = http.createServer(async (request, response) => {
  const method = request.method;
  const url = request.url;
  console.log({ method, url });

  if (url === '/') {
    response.setHeader('content-type', 'text/html');
    return response.end(index);
  }
  if (method === 'POST') {
    const payload = await getPayload(request);
    if (url === '/msg') {
      payload.message && messages.push(payload.message);
      console.log({ messages });
      response.end('ok');
      return deliverMessageToPending(payload.message);
    }
  }

  if (method === 'GET') {
    if (url.includes('msg')) {
      const cursor = url.split('/').filter((i) => i)[1] || 1;
      console.log({ cursor });
      const msgPos = messages.length;
      if (msgPos > cursor) {
        // messages are available
        response.end(JSON.stringify({ msgs: messages.slice(cursor - 1, msgPos), cursor: msgPos }));
        return;
      }
      // no new messages
      // add them to the pending clients
      clients.unshift(response);
      // let the request timeout
    } else {
      response.end('ok');
    }
  }
});

server.requestTimeout = 5000; // server waits 5s for receiving the entire request
server.timeout = 3000; // server hangs up the socket if the request is inactive or takes longer than timeout

server.listen(port, () => {
  console.log(`http server listening at ${port}`);
});
