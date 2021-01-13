import Country from './Country'
import CountryView from './CountryView'

const Countries =  ({countriesToShow, handleCountryToShow, countryToShow}) => {
    if (countryToShow !== -1) {
        return (<CountryView key={countriesToShow[countryToShow].name} country={countriesToShow[countryToShow]} />)
       }   
    return (
        <ul>
            {countriesToShow.map((country, index)=>(<Country key={country.name} country={country} handleCountryToShow={handleCountryToShow} index={index} />))}          
        </ul>
    )
}

export default Countries