import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // const [selectedOptions, setSelectedOptions] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(''); // Default value is an empty string

const handleDropdownChange = (e) => {
  setSelectedOptions(e.target.value);
};

  // Handle text input change
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate JSON input
    try {
      const parsedData = JSON.parse(jsonInput);
      
      // Make API call
      try {
        const res = await axios.post('https://final-back-m4hl.onrender.com/bfhl', parsedData);
        setResponse(res.data);
        setDropdownOptions(['Alphabets', 'Numbers', 'Highest lowercase alphabet']);
        setIsDropdownVisible(true);
        setErrorMessage('');  // Clear error message
      } catch (apiError) {
        setErrorMessage('API error: ' + apiError.message);
      }
    } catch (err) {
      setErrorMessage('Invalid JSON format.');
    }
  };
  

  // Handle dropdown selection
  // const handleDropdownChange = (e) => {
  //   const { options } = e.target;
  //   const selected = [];
  //   for (const option of options) {
  //     if (option.selected) {
  //       selected.push(option.value);
  //     }
  //   }
  //   setSelectedOptions(selected);
  // };

  // Function to render filtered response based on selected options
  const renderFilteredResponse = () => {
    if (!response) return null;

    const result = {};
    if (selectedOptions.includes('Alphabets')) {
      result.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      result.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        {Object.keys(result).map((key) => (
          <div key={key}>
            <strong>{key}:</strong> {result[key].join(', ')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="maindiv" style={{ padding: '20px' }}>
      <h1>Dinakar S RA2111003010999</h1>

      {/* JSON Input Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            rows="6"
            cols="80"
            placeholder='Enter valid JSON data here'
            value={jsonInput}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" style={{ marginTop: '40px' }}>Submit</button>
      </form>

      {/* Error message */}
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}

      {/* Dropdown for selecting response filters */}
      {isDropdownVisible && (
        <div style={{ marginTop: '20px' }}>
          <label id="label" htmlFor="options">Multi Filter: </label>
<select 
  id="options"
  value={selectedOptions}
  onChange={handleDropdownChange}
   // Adjusted height for a dropdown
>
  <option value=""  disabled>Select an option</option> {/* Placeholder option */}
  {dropdownOptions.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ))}
</select>

        </div>
      )}

      {/* Filtered response */}
      {selectedOptions.length > 0 && (
        <div id="lastdiv" style={{ marginTop: '20px' }}>
          <h3 id="lasth3">Filtered Response:</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
