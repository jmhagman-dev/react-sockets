import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState([]);
  const [inputData, setInputData] = useState('')
  useEffect(() => {
    // Connection
    socket.on('connect', () => {
      
      console.log('+ Connected');
    


    });

    // Disconnection
    socket.on('disconnect', () => {
      console.log('disconnecting')
    });

    // Turning off socket
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [messages]);


  function handleClick() {
    socket.emit('message', {
      text: inputData,
      id: `jmh`,
      socketId: 'jmh',
    });
  }
  return (
    <div>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
      <input type='text' onChange={(event) => setInputData(event.target.value)} />
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default App;
