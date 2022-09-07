const PersonForm = ({ newName, newNameHandler, newNumber, newNumberHandler, addName }) => 
  <form>
    <div>
      name: <input value={newName} onChange={newNameHandler} />
    </div>
    <div>number: <input value={newNumber} onChange={newNumberHandler} /></div>
    <div>
      <button type="submit" onClick={addName}>add</button>
    </div>
  </form>

export default PersonForm
