import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const result = await axios.post('https://your-backend-url/bfhl', { data: parsedData.data });
      setResponse(result.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON or failed to fetch data');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes('numbers') && <p>Numbers: {JSON.stringify(response.numbers)}</p>}
        {selectedOptions.includes('alphabets') && <p>Alphabets: {JSON.stringify(response.alphabets)}</p>}
        {selectedOptions.includes('highest_lowercase_alphabet') && (
          <p>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend Application</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Select Data to Display:</h2>
          <label>
            <input
              type='checkbox'
              value='numbers'
              onChange={handleOptionChange}
            /> Numbers
          </label>
          <label>
            <input
              type='checkbox'
              value='alphabets'
              onChange={handleOptionChange}
            /> Alphabets
          </label>
          <label>
            <input
              type='checkbox'
              value='highest_lowercase_alphabet'
              onChange={handleOptionChange}
            /> Highest Lowercase Alphabet
          </label>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
