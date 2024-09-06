const net = require('net');
const readLine = require('readline').promises;

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  }
);

const socket = net.createConnection(
  {port: 8000, host: '127.0.0.1'}, 
  async() => {
    console.log('Connected to server..');
    const message = await rl.question('Enter a message: ');
    socket.write(message)
});

socket.on('data', (data) => {
  console.log(data.toString('utf-8'));
})

socket.on('end', ()=> {
  console.log('End Connection')
})