process.on('message', (data) => {
  console.log('child', { data });
  process.send({ result: longRunningTask() });
});

function longRunningTask() {
  return 'OK';
}
