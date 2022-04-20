import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";

// API PREFIX URL: Replace <https://hosting-hackathon-demo.herokuapp.com/> with your heroku app
const URL = process.env.NODE_ENV === "development" ? "http://localhost:5000/": "https://hosting-hackathon-demo.herokuapp.com/";

function App() {
  const [text,setText] = useState("<DEFAULT TEXT>")
  // Show you can get stuff from the server
  useEffect(()=>{
     fetch(`${URL}hello`,{
      method:"GET",
      mode: "cors",
      headers: {
        'Content-Type': "application/json"
      },
    }).then(data =>{
      return data.json()
    }).then(data => {
      const {msg} = data
      setText(msg)
    })
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {text}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
