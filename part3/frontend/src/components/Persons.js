import PersonsService from '../services/persons'

const Persons = ({ persons, setPersons, filter }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      {
        filteredPersons.map(person =>
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => {
              if (window.confirm(`Delete ${person.name}?`)) {
                PersonsService.deletePerson(person.id)
                setPersons(persons.filter(p => p.id !== person.id))
              }
            }}>delete</button>
          </p>
        )}
    </div>
  )
}

export default Persons
