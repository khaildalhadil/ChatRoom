const net = require('net');
const server = net.createServer();

const clients = [];
server.on('connection', (socket)=> {
  console.log('New Conneation...')

  socket.on('data', (data) => {
    
    clients.map((client, i) => {
      client.write(`client ${++i}: ${data}`)
    });
  })

  clients.push(socket);
})

server.listen(8000, '127.0.0.1', ()=> {
  console.log('Open server in ', server.address());
})
