const net = require('net');
const server = net.createServer();

const clients = [];

server.on('connection', (socket)=> {
  let userId = clients.length + 1
  socket.write(`Your Id is ${userId}`);

  clients.map((client) => {
    client.socket.write(`>User ${userId} Join To chatRoom`)
  });

  socket.on('data', (data) => {
    
    clients.map((client) => {
      client.socket.write(`>User ${userId}: ${data}`)
    });

  });

  clients.push({id: userId, socket });
  
  socket.on('close', ()=> {
    clients.map((client) => {
      client.socket.write(`>User ${userId} Left The ChatRomm`)
    });
  })

  socket.on('error', (er)=> {
    console.log(``)
  })
  
})

server.listen(8080, '127.0.0.1', ()=> {
  console.log('Open server in ', server.address());
})