import React from 'react'

const PersonForm = (props) => {
  const {
    newName, newNumber,
    onChangeName, onChangeNumber, onAdd
  } = props
  
  return (
    <form>
      <div>
        Name: <input onChange={onChangeName} value={newName} />
      </div>
      <div>
        Number: <input onChange={onChangeNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={onAdd}>Add</button>
      </div>
    </form>
  )
}

export default PersonForm