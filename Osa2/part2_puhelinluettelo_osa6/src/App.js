import React from 'react';
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
      
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
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
    console.log('render')
    const personsToShow =
      this.state.filter === ""?
      this.state.persons:
      this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()));
      console.log(this.state.filter)

    
    
    return (
      
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <Filter 
          heading = "rajaa näytettäviä:"
          value = {this.state.filter} 
          onChange ={this.handlePersonChangeRajaa}
          />
          <br/>
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