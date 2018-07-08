import React from 'react';
import Note from './components/Note'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas'}
      ],
      newName: ''
    }
  }

  addNote = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    console.log(event.target)
    const noteObject = {
      content: this.state.newName,
      date: new Date().new,
      id: this.state.persons.length
    }

    const kopiopersons = [...this.state.persons]
    var kopiopersonsText = kopiopersons.map(x => x.name)

    if (!kopiopersonsText.includes(noteObject.content)) {
      kopiopersons[noteObject.id]={name:noteObject.content}
    } else {
      alert("The name is already in the Puhelinluettelo!!!")
    }   
    console.log(!kopiopersonsText.includes(noteObject.content))

     
    
   

    this.setState({
      persons: kopiopersons,
      newName: ''
    })

  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }


  render() {
    
    return (
      
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNote}>
          <div>
            nimi: 
            <input 
            value={this.state.newName}
            onChange={this.handleNoteChange}
            />
          </div><br/>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form >
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map((person) => <Note key ={person.name} note = {person}/>)}
        </ul>               
      
      </div>
    )
  }
}

export default App