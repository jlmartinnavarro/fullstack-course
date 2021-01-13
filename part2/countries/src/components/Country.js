
const Country = ({country, index, handleCountryToShow}) => {
    if (!country.languages) {
        return (<p>{country.name}</p>)
    }

    return (<li key={country.name} id={country.name}>{country.name} <button onClick={handleCountryToShow} value={index}>show</button></li>)
}    
export default Country