// src/AverageCalculator.js
import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchNumbers = async () => {
    try {
      setError(null);
      const res = await axios.get(`http://localhost:5000/numbers/${numberId}`);
      setResponse(res.data);
    } catch (err) {
      setError('Failed to fetch data or response took too long.');
    }
  };

  const handleInputChange = (e) => {
    setNumberId(e.target.value);
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <input
        type="text"
        value={numberId}
        onChange={handleInputChange}
        placeholder="Enter number ID (e.g., p, f, e, r)"
      />
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h2>Window Previous State:</h2>
          <pre>{JSON.stringify(response.windowPrevState, null, 2)}</pre>
          <h2>Window Current State:</h2>
          <pre>{JSON.stringify(response.windowCurrState, null, 2)}</pre>
          <h2>Numbers Received:</h2>
          <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
          <h2>Average:</h2>
          <p>{response.avg}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
