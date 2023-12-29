import { useEffect, useState } from 'react';
import axios from 'axios'
// import Form from './components/Form';
import './App.css'

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [dataList, setDataList] = useState([])

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
    if (data.data.status === "success") {
      alert(data.data.message)
      setFormdata({
        name: '',
        email: '',
        phone: ''
      })
      getFetchData()
    }
  }

  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.status === "success") {
      setDataList(data.data.data)
      // alert(data.data.message)
    }
  }
  
  useEffect(() => {
    getFetchData() 
  }, [])

  // console.log(dataList)

  const handleDelete = async (id) => {
    const data = await axios.delete(`/delete/${id}`)
    if (data.data.status === "success") {
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async (id) => {
    const data = await axios.put(`/update/${id}`, formData)
    if (data.data.status === "success") {
      getFetchData()
      alert(data.data.message)
    }
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

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { 
            dataList[0] ? ( dataList.map((data) => {
              return (
                <tr>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td><button onClick={() => handleUpdate(data._id)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(data._id)}>Delete</button></td>
                </tr>
              )
            }))
            : (
              <tr>
                <td colSpan="4">No data</td>
              </tr>
            )
          }
        </tbody>
      </table>

    </>
  )
}

export default App
