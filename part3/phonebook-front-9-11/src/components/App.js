import React, { useState, useEffect } from 'react'

import Persons from './Persons'
import FormPerson from './FormPerson'
import Filter from './Filter'
import Notification from './Notification'

import serverComms from './ServerComms'

const App = () => {
  const [ persons   , setPersons   ] = useState([]) 
  const [ newName   , setNewName   ] = useState('')
  const [ newNumber , setNewNumber ] = useState('')
  const [ filter    , setNewFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationHTMLClass, setNotificationHTMLClass] = useState('notification')

  useEffect(() => {
    serverComms.getAll().then(
      initialPerson => setPersons(initialPerson)
    )
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

  const raiseError = (error) => {
  console.log(error)
          setNotificationHTMLClass('error')
          setNotificationMessage(error.response.data)
          
          setTimeout(() => setNotificationMessage(''), 3000)

  }
  const addPerson = (event) => {    
    event.preventDefault()
    let index = persons.findIndex(person => person.name === newName)
    if (index !== -1) {
      let confirm = window.confirm("Do you want to update this item?")
      if (confirm) {
        serverComms.update(persons[index].id, {...persons[index], number:newNumber})
        const copyPersons = [...persons]
        copyPersons[index].number = newNumber
        setPersons(copyPersons)
        setNewName('')
        setNewNumber('')   
      }
      
    }
    else {    
        const personObject = {
            name: newName,
            number: newNumber,
            //id: persons.length + 1
        }
        serverComms.create(personObject).then(
          response => {
            setNotificationHTMLClass('notification')
            setNotificationMessage(`${newName} has been added`)
            
            setTimeout(() => setNotificationMessage(''), 3000)
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')    
            
          }
        ).catch(error => raiseError(error))
    }
  }

  const deleteHandler = (id) => {
    return () => {
      let confirm = window.confirm("Do you want to delete this item?")
      if (confirm) {
        serverComms.delet(id, raiseError)
        persons.find(person => person.id === id)
        setPersons(persons.filter(person => person.id !== id))
      }
    }
  }

  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))  

  return (
    <div>
        <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <h2>add a new</h2> <Notification message={notificationMessage} classs={notificationHTMLClass}/>
            <FormPerson newName={newName} 
                        handleNameChange={handleNameChange}
                        newNumber={newNumber}
                        handleNumberChange={handleNumberChange}
                        addPerson={addPerson}/>
        <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App