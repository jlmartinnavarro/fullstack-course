
const FormPerson = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => (
    
    <div>
        <form>
            <label for='name'>name:</label>
            <input value={newName} 
                onChange={handleNameChange} id='name'/>
            <br/>
            <label for='number'>number:</label>
            <input value={newNumber}
                onChange={handleNumberChange} id='number' type='tel'/>
            <br/>
            <button type="submit" onClick={addPerson}>add</button>
        </form>
    </div>
)

export default FormPerson