const net = require('net');
const server = net.createServer();

const clients = [];
let id = 0

server.on('connection', (socket)=> {
  
  console.log('New Conneation...')

  socket.on('data', (data) => {
    
    clients.map((client) => {
      client.write(data)
    });
  });

  clients.push(socket);

  socket.on('error', (er)=> {
    console.log(er.message)
  })
  
})

server.listen(8000, '127.0.0.1', ()=> {
  console.log('Open server in ', server.address());
})