import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
      
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    console.log(event.target)
    const personObject = {
      name: this.state.newName, 
      number: this.state.newNumber,
      date: new Date().new,
      id: this.state.persons.length
    }

    const kopiopersons = [...this.state.persons]
    var kopiopersonsText = kopiopersons.map(person => person.name)

    if (!kopiopersonsText.includes(personObject.name)) {
      kopiopersons[personObject.id]={name:personObject.name, number:personObject.number}
    } else {
      alert("The name is already in the Puhelinluettelo!!!")
    }   
    console.log(!kopiopersonsText.includes(personObject.name))

     
    
   

    this.setState({
      persons: kopiopersons,
      newName: '',
      newNumber:""
  
    })

  }

  handlePersonChangenimi = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value})
  }

  handlePersonChangenumber = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value})
  }

  handlePersonChangeRajaa = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value})
  }

  


  render() {
    const personsToShow =
      this.state.filter === ""?
      this.state.persons:
      this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()));
      console.log(this.state.filter)
    return (
      
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            rajaa näytettäviä:<input 
            value={this.state.filter}
            onChange={this.handlePersonChangeRajaa}
            />
          </div><br/>
          <h2>Lisää uusi</h2>
          <div>
            nimi: 
            <input 
            value={this.state.newName}
            onChange={this.handlePersonChangenimi}
            />
          </div><br/>
          <div>
            numero: <input
            value ={this.state.newNumber}
            onChange={this.handlePersonChangenumber}
            />
          </div><br/>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form >
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map((person) => <Person key ={person.name} person = {person}/>)}
        </ul>               
      
      </div>
    )
  }
}

export default App