import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Log from './Log';
import Summary from './Summary';

function App() {
  const [data, setData] = useState([]);
  const [hasError, setError] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getStocks();
    }, 2000);

    return () => { clearInterval(intervalId) };
  }, []);

  const getStocks = () => {
    axios.get('https://join.reckon.com/stock-pricing')
      .then((response) => {
        let d = new Date();
        let time = d.toLocaleString();
        setTime(time);
        setData(response.data)
        setError(false);
        console.log(time)
      })
      .catch((error) => {
        setError(error.message);
        let d = new Date();
        let time = d.toLocaleString();
        setTime(time);
        setError(true);
        console.log(time)
      });
  };

  return (
    <div className='App'>
      <div className="log_section">
        <Log data={data} time={time} hasError={hasError}/>
      </div>
      <div className="summary_section">
        <Summary data={data} time={time} hasError={hasError} />
      </div>
    </div>
  );
}

export default App;

