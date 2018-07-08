import React from 'react';
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'

const Notification = ({ message, messageClass }) => {
  if (message === '') {
    return null
  }
  return (
    <div className = {messageClass}>
      {message}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message:'',
      messageClass:''
          
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  createNewPerson = (personObject) => {
    personService
    .create(personObject)
    .then(response => {
      console.log(response)
      this.setState({
        persons: this.state.persons.concat(response.data),
        newName: '',
        newNumber: '',
        messageClass:"okMessage"
      })
    })
    this.setMessage(`lisättiin ${personObject.name} !`)
  }

  numberUpdate = (id,personObject) => {
    if (window.confirm(personObject.name + "  on jo luettelossa, korvaatanko vanha numero uudella ?")){
    personService
    .update(id, personObject)
    .then(response => {
      console.log(response)
      const persons = this.state.persons.filter(person => person.id !== id).concat(response.data)
      this.setState({
        persons: persons,
        newName: '',
        newNumber: '',
        messageClass:"okMessage"
      })  
    })
    this.setMessage(` ${personObject.name} muokattu !`)
    }
  }

  setMessage = (message) => {
    this.setState(
        {message:message}
    )
    setTimeout(() => {
        this.setState({
            message:''
        })}, 1000)
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    console.log(event.target)
    const personObject = {
      name: this.state.newName, 
      number: this.state.newNumber,
      date: new Date().new,
    }
        
    const isItNewName = this.state.persons.find(person => person.name === personObject.name);

    if (!isItNewName)  {
      this.createNewPerson(personObject)
      
    } else {
        this.numberUpdate(isItNewName.id, personObject)
    }   
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

  handlePersonDelete = (id) => {
    return () => {
      const person = this.state.persons.find(person => person.id === id)
      if (window.confirm("Poistetaanko   "+person.name+ " ?")) {
        personService
        .del(id)
        .then(response => {
          console.log(response)
          const persons = this.state.persons.filter(person => person.id !== id)
          this.setState({
            persons:persons,
            messageClass:"okMessage"
              
          })
        })
        this.setMessage(`${person.name} poistettu listalta !`)
      }
    }
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
        <Notification message = {this.state.message} messageClass = {this.state.messageClass} />
        <form onSubmit={this.addPerson}>
          <Filter 
          heading = "rajaa näytettäviä:"
          value = {this.state.filter} 
          onChange ={this.handlePersonChangeRajaa}
          />
          <br/>
          <h2>Lisää uusi / muuta olemassaolevan numeroa </h2>
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
        
          <table>
            <tbody>
              {personsToShow.map((person) => 
              <Person 
              key ={person.id} 
              person = {person} 
              onClick = {this.handlePersonDelete(person.id)}/>)
            }
            </tbody>
          </table>
                       
      
      </div>
    )
  }
}

export default App