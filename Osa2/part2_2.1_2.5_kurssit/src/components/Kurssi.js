import React from 'react'

const Kurssi = ({kurssi}) => {
    return (
    <div>
        <Otsikko nimi = {kurssi.nimi}/>
        <Sisalto kurssi = {kurssi}/>
        <Yhteensa kurssi = {kurssi}/>
    </div>
    )
}

const Otsikko = ({nimi}) => {
  return (
    <div>
        <h1>{nimi}</h1>
    </div>
  )
}

const Sisalto = ({kurssi}) => {
      return (
    <div>
      <ul>
        {kurssi.osat.map(kurssiosat => <li key = {kurssiosat.id}> {kurssiosat.nimi} {kurssiosat.tehtavia}</li>)}
      </ul>
    </div>    
  )
}


const Yhteensa = ({kurssi}) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const tehtavat = (kurssi.osat.map(kurssiosat  => kurssiosat.tehtavia));


  return (
    <div>
      <p>yhteensä {tehtavat.reduce(reducer,0)} tehtävää</p>
    </div>    
  )
}

export default Kurssi