const { fork, exec, execFile, spawn } = require('node:child_process');

// exec, execFile are not suitable for large stdout, buffer length will exceed
// exec will start a shell where you can run commands
exec('pwd', (err, stdout, stderr) => {
  if (err) {
    console.log({ err });
    return;
  }
  if (stderr) {
    console.log({ stderr });
    return;
  }
  console.log('exec', { stdout });
});

// will run an executable file
execFile('./execFile.js', (err, stdout, stderr) => {
  if (err) {
    console.log({ err });
    return;
  }
  if (stderr) {
    console.log({ stderr });
    return;
  }

  console.log('execFile', { stdout });
});

// for larger stdout use spawn
// it returns streams
const spawnedChild = spawn('ls', ['-a']);
spawnedChild.stdout.on('data', (data) => {
  console.log('spawnData', { data });
});

spawnedChild.stderr.on('data', (data) => {
  console.log('spawnStdErr', { data });
});

spawnedChild.on('error', (err) => {
  console.log('spawnErr', { err });
});

spawnedChild.on('exit', (code, signal) => {
  console.log('spawnedChild Exit ', { code, signal });
});

function sendToChildProcess() {
  const child = fork('./fork.js');
  child.send({ message: 'hey' });
  child.on('message', (msg) => {
    console.log('parent', { msg });
    child.disconnect();
  });
}

sendToChildProcess();
