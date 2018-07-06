import React from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) =>{
  return (
    <div>
      <h1>{props.nimi}</h1>
    </div>
  )
}



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva:0, 
      neutraali:0,
      huono:0
    }
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }  



  render() {
    return (
      <div>
        
        <div>
          <Heading nimi = {"anna palautetta"}/>
         
          <Button
            handleClick={this.klikHyva}
            text="hyvä"
          />
            
          <Button
            handleClick={this.klikNeutraali}
            text="neutraali"
          />
          <Button
            handleClick={this.klikHuono}
            text="huono"
          />
          <Heading nimi = {"statistiikka"}/>
          <Display counter={this.state.hyva} text = "hyvä"/>
          <Display counter={this.state.neutraali} text = "neutraali"/>
          <Display counter={this.state.huono} text = "huono"/>
          
        </div>
      </div>
    )
  }
}

const Display = ({ counter, text }) => <div> {text} {counter}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



ReactDOM.render(
  <App />,
  document.getElementById('root')
)