import React from 'react'

const Person = ({ person, onClick }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}

export default Person