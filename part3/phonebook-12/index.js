require('dotenv').config()
const { response, request } = require('express')
const cors = require('cors')
const express = require('express')
const baseUrl = '/api/notes'
let morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.static('build'))

const Person = require('./models/person')

let persons = Person.find({}).then(personsFromDB=> {  
  persons = personsFromDB
  console.log("FIND", persons)

})

app.get('/info', (_, response) => {
  Person.find({}).count((error, res) => {
    console.log(res)
    response.send(`Phonebook has info for ${res} people <br/>${new Date().toString()}`)
  }).catch(error => next(error))  
})

app.get('/api/persons', (_, response) => {
  console.log("persons", persons)
  if (!persons) {
    Person.find({}).then(personsFromDB=> {  
      response.json(personsFromDB)
    })
  }
  else {
    response.json(persons)
  }
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log("result", result)
      for (let i = 0; i < persons.length; i++) {
        
        if (persons[i]._id.toString() === result._id.toString()) {
          console.log("FOUND")
          persons.splice(i, 1)
          break
        }
      }
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log("BODY", request.body)
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  console.log("update person", person, request.params)
  Person.findByIdAndUpdate(request.params.id, person, { new: true,  runValidators: true 
   })
    .then(updatePerson => {
      console.log("update", updatePerson)
      for (let i = 0; i < persons.length; i++) {
        if (persons[i]._id.toString() === updatePerson._id.toString()) {
          persons[i] = updatePerson
          break
        }
      }
      response.json(updatePerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  console.log("HEYHEY")
  const body = request.body
  if (!body.name || !body.number) 
    return response.status(400).json({error : 'Content missing, include both name and number'})
  

  if (persons.find(person => person.name === body.name))
    return response.status(400).json({error : 'Name already in phonebook'})
  
  const person = new Person({
    name: body.name,
    number: body.number
  })
  error = person.validateSync()
  console.log(error)
  persons = persons.concat(person)
  person.save().then(savedPerson => savedPerson.toJSON()
  ).then(savedAndFormattedNote => 
    response.json(savedAndFormattedNote)
  ).catch(error => next(error))
  
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  
  
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)