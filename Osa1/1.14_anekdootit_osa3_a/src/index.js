import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected:0,
      kaikki:[0,0,0,0,0,0],
      maxpopular:0
  }
}

  randominBetween = (min, max) => {
    return  Math.floor(Math.random() * max) + min 
  }

  klikRandom = (min,max) => () => {
    return (
      this.setState({
        selected: this.randominBetween(min,max),
      })
    )
  }

  klikVote = () => {
    const kopio = [...this.state.kaikki]
    kopio[this.state.selected] += 1
    const max = kopio.indexOf(Math.max(...kopio))
    
    return (
        this.setState({
            kaikki:kopio,
            maxpopular:max
        })    
    )
  }

  render() {
  
    return (
      <div>
        <AnecdotesInContext 
        state1 = {this.state}
        state2 = {this.props}
        context = {"selected"}
        />
        <Button
          handleClick={this.klikVote}
          text="vote"
        />
        <Button
          handleClick={this.klikRandom(0,5)}
          text="next anecdote"
        />
        <Heading nimi = {"anecdote with most votes:"} />
        <AnecdotesInContext 
        state1 = {this.state}
        state2 = {this.props}
        context = {"maxpopular"}
        />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Heading = (props)  => (
        <div>
            <h1>{props.nimi}</h1>
        </div>
)

const Anecdotes = ({textanecdote, textvote}) => {
    return (
        <div>
            <p> {textanecdote} </p>
            <p> has {textvote} votes </p>
        </div>
    )
}

const AnecdotesInContext = ({state1, state2, context}) => {
    if (context === "maxpopular"){
        if (Math.max(...state1.kaikki) === 0) {
            return (
                <div> no voting yet  </div>
            )
        }
        return (
          <Anecdotes 
          textanecdote = {state2.anecdotes[state1.maxpopular]} 
          textvote ={state1.kaikki[state1.maxpopular]}
          />
        )
    }
    return (
      <Anecdotes 
      textanecdote = {state2.anecdotes[state1.selected]} 
      textvote ={state1.kaikki[state1.selected]}
      />
    )
  }

  ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
  )