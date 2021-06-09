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

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (_, response) => {
  response.send(`Phonebook has info for ${persons.length} people <br/>${new Date().toString()}`)
})

app.get('/api/persons', (_, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) 
    response.json(person)
  else
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
const generateID = () => {
  /*
  const maxID = persons.length > 0 
  ? Math.max(...notes.map(n => n.id))
  : 0
  return maxID + 1*/
  return Math.random() * 1000000
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) 
    return response.status(400).json({error : 'Content missing, include both name and number'})
  

  if (persons.find(person => person.name === body.name))
    return response.status(400).json({error : 'Name already in phonebook'})
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }
  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
