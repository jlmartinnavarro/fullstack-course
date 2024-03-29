const mongoose = require('mongoose')
const process = require('process')
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.yomrv.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => console.log(`${person.name} ${person.number}`))

    mongoose.connection.close()
  })
  //console.log('Please provide the name and number as an argument: node mongo.js <password> <name> <number>')
  //process.exit(1)
}
else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    'name': name,
    'number': number
  })

  person.save().then(() => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}