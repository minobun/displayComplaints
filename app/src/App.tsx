import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import io, {Socket} from 'socket.io-client';

const serverURL:string = "localhost:3010";


const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect()
    }
  },[]);

  return socket;
};

const App:React.FC = () => {
  //入力部分の設定
  const [inputChatText, setInputChatText] = useState<string>("");
  //出力部分の設定
  const [outputChatText, setOutputChatText] = useState<string[]>([])

  // Socketの準備
  const socket = useSocket();

  //チャットの受信
  useEffect(() => {
    if(socket !== undefined){
      //チャットの受信
      socket.on('message', (msg:string) => {
          setOutputChatText([...outputChatText, msg]);
      });
    }
  },[outputChatText,socket]);

  //チャットの送信
  const sendMessagesSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(socket !== undefined) socket.emit('message', inputChatText);
    setInputChatText('');
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={sendMessagesSubmit}>
          <input type="text" value={inputChatText} onChange={(e) => setInputChatText(e.target.value)} /> 
          <button type="submit">Send</button>
        </form>
      </div>
      <div>
        {outputChatText.map((msg,index) => (
          <div key={index} className='transition-opacity duration-100 opacity-0'>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
