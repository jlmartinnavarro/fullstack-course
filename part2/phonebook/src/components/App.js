import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './Persons'
import FormPerson from './FormPerson'
import Filter from './Filter'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)  
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {    
    event.preventDefault()
    if (persons.indexOf(newName) !== -1) {
        alert(`${newName} is already added to phonebook`)
    }
    else {    
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
  
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')    
    }
  }

  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))  

  return (
    <div>
        <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <h2>add a new</h2>
            <FormPerson newName={newName} 
                        handleNameChange={handleNameChange}
                        newNumber={newNumber}
                        handleNumberChange={handleNumberChange}
                        addPerson={addPerson}/>
        <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App