
const FormPerson = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => (
    
    <div>
        <form>
            <label htmlFor='name'>name:</label>
            <input value={newName} 
                onChange={handleNameChange} id='name'/>
            <br/>
            <label htmlFor='number'>number:</label>
            <input value={newNumber}
                onChange={handleNumberChange} id='number' type='tel'/>
            <br/>
            <button type="submit" onClick={addPerson}>add</button>
        </form>
    </div>
)

export default FormPerson