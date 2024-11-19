import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [txtValue, setTxtValue] = useState("")

  const handleOnChange = (e) => {
    setTxtValue(e.target.value);
  }

  const handleOnSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/data', { data: txtValue });
      console.log(response.data);
    } catch (error) {
      console.error('Error writing to the database', error);
    }
  }

  return (
    <>
      <textarea id="w3review" name="w3review" rows="10" cols="50" onChange={handleOnChange}></textarea> <br></br>

      <button onClick={handleOnSubmit}>
        Submit Data
      </button>

    </>
  )
}

export default App
