import { useState } from 'react';
import axios from 'axios'
import './App.css'

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleOnChange = (event) => {
    const {name, value} = event.target
    setFormdata({...formData, [name]: value})
  }

  const handleAddSection = () => {
    setAddSection(true)
  }

  const handleCloseSection = () => {
    setAddSection(false)
  }

  const handleSumbit = async (event) => {
    event.preventDefault();
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.status === "Success") {
      alert(data.data.message)
      setFormdata({
        name: '',
        email: '',
        phone: ''
      })
    }
  }

  const handleFetchData = async () => {
    
  } 

  return (
    <>
      <button onClick={handleAddSection}>Add</button>

      {addSection && (
          <form onSubmit={handleSumbit}>
            <label htmlFor="">Name: </label>
            <input type="text" name='name' value={formData.name} onChange={handleOnChange}/>

            <label htmlFor="">Email: </label>
            <input type="email" name='email' value={formData.email} onChange={handleOnChange}/>

            <label htmlFor="">Phone: </label>
            <input type="number" name='phone' value={formData.phone} onChange={handleOnChange}/>

            <button>Submit</button>
            <button onClick={handleCloseSection}>Close</button>
          </form>
        )
      }
    </>
  )
}

export default App
