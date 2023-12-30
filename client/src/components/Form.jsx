const Form = ({handleSumbit, handleOnChange, handleCloseSection, props}) => {
    return (
        <form onSubmit={handleSumbit}>
            <label htmlFor="">Name: </label>
            <input type="text" name='name' value={props.name} onChange={handleOnChange}/>

            <label htmlFor="">Email: </label>
            <input type="email" name='email' value={props.email} onChange={handleOnChange}/>

            <label htmlFor="">Phone: </label>
            <input type="number" name='phone' value={props.phone} onChange={handleOnChange}/>

            <button>Submit</button>
            <button onClick={handleCloseSection}>Close</button>
          </form>
    )
}

export default Form;