const net = require('net');
const readLine = require('readline').promises;

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  }
);

// to avoid call back hill we will use promises
// I make it to clear one line
const clearLine = (dir) => {
  return new Promise((res, rej) => {
    process.stdout.clearLine(dir, ()=> {
      res();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((res, rej) => {
    process.stdout.moveCursor(dx, dy, ()=> {
      res()
    })
  })
}

let id;

const socket = net.createConnection(
  {port: 8000, host: '127.0.0.1'}, 
  async() => {
    console.log('Connected to server..');
    const ask = async () => {
      const message = await rl.question('Enter a message: ');
      // move the input down
      await moveCursor(0, -1);
      socket.write(`>User ${id}: ${message}`);
    }

    ask()
    socket.on('data', async (data) => {

      console.log()
      await moveCursor(0, -1);
      await clearLine(0);
      
      if (data.toString('utf-8').startsWith('Id')) {
        id = data.toString('utf-8').substring(3);
        console.log(`Your Id is: ${id}`);
      } else {
        console.log(data.toString('utf-8'));
      }

      ask()
    })
});
  

socket.on('error', (err) => {
  console.log(err.message)
})

socket.on('close', ()=> {
  console.log('End Connection')
})
