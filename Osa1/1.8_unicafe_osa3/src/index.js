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
      huono:0,
      keskiarvo:0,
      positiivisia:0
    }
  }

  precisionRound = (number, precision) => {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
  
  klik = (arvohyva, arvoneutraali, arvohuono) => () => {
    let sum = arvohyva + arvohuono + arvoneutraali;
    this.setState({
      hyva: arvohyva,
      neutraali: arvoneutraali,
      huono: arvohuono,
      keskiarvo:this.precisionRound(((arvohyva*(1) + arvohuono*(-1))/sum),1),
      positiivisia:this.precisionRound((arvohyva/sum)*100,1)
    })
  }

  render() {
    return (
      <div>
        <div>
          <Heading nimi = {"anna palautetta"}/>
          <Button
            handleClick={this.klik(this.state.hyva + 1, this.state.neutraali, this.state.huono)}
            text="hyvä"
          />
         
          <Button
            handleClick={this.klik(this.state.hyva, this.state.neutraali + 1, this.state.huono)}
            text="neutraali"
          />
          <Button
            handleClick={this.klik(this.state.hyva, this.state.neutraali, this.state.huono + 1)}
            text="huono"
          />
          <Heading nimi = {"statistiikka"}/>
          <Statistics state = {this.state}/>
          
        </div>
      </div>
    )
  }
}



const Statistic = (props) => <div> {props.text} {props.counter}</div>
const Statistics = (props) => {
  return (
    <div>
      <Statistic counter={props.state.hyva} text = "hyvä"/>
      <Statistic counter={props.state.neutraali} text = "neutraali"/>
      <Statistic counter={props.state.huono} text = "huono"/>
      <Statistic counter={props.state.keskiarvo} text = "keskiarvo"/>
      <Statistic counter={props.state.positiivisia + " %"} text = "positiivisia"/>
    </div>  
  )  
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)