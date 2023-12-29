const Form = ({handleSumbit, handleOnChange}) => {
    return (
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

export default Form;