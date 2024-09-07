const net = require('net');
const readLine = require('readline').promises;

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  }
);

// to avoid call back hill we will use promises
// I make it to clear one line
const clearLine = () => {
  process.stdout.clearLine(dir)
  
}


const socket = net.createConnection(
  {port: 8000, host: '127.0.0.1'}, 
  async() => {
    
    console.log('Connected to server..');
    
    const ask = async () => {
      const message = await rl.question('Enter a message: ');
      // clear one line 0 
      
      await readLine.clearnLine(process.stdout, 0);

      socket.write(message);
    }

    ask()
    socket.on('data', (data) => {
      console.log(data.toString('utf-8'));
    })
});

socket.on('error', (err) => {
  console.log(err.message)
})

socket.on('close', ()=> {
  console.log('End Connection')
})
