
const CountryView = ({country}) => {
    return (
        <div >
            <h4>{country.name}</h4>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h5>languages</h5>
                <ul>
                    {country.languages.map((language, index)=>(<li key={index}>{language.name}</li>))}
                </ul>        
            <img src={country.flag} alt={`Flag from ${country.name}`}/>
        </div>)
    
}

export default CountryView