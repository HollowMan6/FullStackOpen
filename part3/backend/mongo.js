const mongoose = require('mongoose')

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const People = mongoose.model('People', peopleSchema)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 3 || process.argv.length === 5) {
  const password = process.argv[2]
  const url = `mongodb+srv://:${password}@/Persons?retryWrites=true&w=majority`

  mongoose
    .connect(url)
    .then(() => {
      if (process.argv.length === 3) {
        People.find({}).then(result => {
          console.log('phonebook:')
          result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
          return mongoose.connection.close()
        })
      } else if (process.argv.length === 5) {
        const person = new People({
          name: process.argv[3],
          number: process.argv[4],
        })

        person.save().then(result => {
          console.log(`added ${result.name} number ${result.number} to phonebook`)
          mongoose.connection.close()
        })
      }
    })
    .catch((err) => console.log(err))

} else {
  console.log('Wrong number of arguments')
  process.exit(1)
}
