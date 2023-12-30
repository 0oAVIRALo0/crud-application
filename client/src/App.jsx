import { useEffect, useState } from 'react';
import axios from 'axios'
import Form from './components/Form';
import './App.css'

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [dataList, setDataList] = useState([])
  const [editSection, setEditSection] = useState(false)

  const [editFormData, setEditFormdata] = useState({
    name: '',
    email: '',
    phone: '',
    _id: ''
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

  const handleEditOnChange = async (event) => {
    const { name, value } = event.target;
    setEditFormdata({...editFormData, [name]: value})
  }

  const handleEdit = async (data) => {
    setEditFormdata(data)
    setEditSection(true)
  }

  return (
    <>

      
        <button onClick={handleAddSection}>Add</button>

        {addSection && (
            <Form handleSumbit={handleSumbit} handleOnChange={handleOnChange} handleCloseSection={handleCloseSection} props={formData}/>
          )
        }

        {editSection && (
            <Form handleSumbit={handleUpdate} handleOnChange={handleEditOnChange} handleCloseSection={() => setEditSection(false)} props={editFormData}/>
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
                  <td><button onClick={() => handleEdit(data)}>Edit</button></td>
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
