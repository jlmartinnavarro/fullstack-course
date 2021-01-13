const Filter = ({filter, handleFilterChange}) => (
    <form >
        <label htmlFor='filter'>find countries </label>
        <input id='filter' value={filter} onChange={handleFilterChange}/>
    </form>
)

export default Filter