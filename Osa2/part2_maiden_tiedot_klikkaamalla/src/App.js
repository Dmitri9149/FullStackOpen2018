import React from 'react';
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const WhatToView = ({countriesToShow, handleOnClick}) => { 
  
  if (countriesToShow.length > 1 && countriesToShow.length <= 10 ) {
    
    return (
      <div>
        <ul>
          {countriesToShow.map((country) => <li onClick = {() => handleOnClick(country.name)} key ={country.name}> {country.name}</li>)}
        </ul>
      </div> 
    )
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many countries to show !</p>
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        {countriesToShow.map((country) => <Country key ={country.name} country = {country}/>)}
      </div>
    )    
  
  } else {  
    return (
      <div>
        <p>No any country to show !</p>
      </div>
  )
  }
  
}  

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter:""
          
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  
  handleCountryFilter = (event) => {
    console.log(event.target.value)
    this.setState({filter:event.target.value})
  }

  handleOnClick = (e) => {
    console.log(e)
    this.setState({filter:e})
  }

  render() {
    console.log('render')

    const countriesFilter =  
    this.state.countries.filter(country => country.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
    const countriesToShow =
      this.state.filter === ""?
      this.state.countries:
      countriesFilter;
      
    const filteringWarning  = countriesToShow.length > 10 ? 
      "too many matches, specify another filter":
      "";
    
    return (
      <div>
        <form >
          <Filter 
          heading ="find countries:" 
          value = {this.state.filter} 
          onChange ={this.handleCountryFilter}
          filteringWarning = {filteringWarning}
          />
        </form ><br/>
        <WhatToView 
        countriesToShow = {countriesToShow}
        handleOnClick = {this.handleOnClick}
        />
        
      </div>  
    )
  }    
}


export default App