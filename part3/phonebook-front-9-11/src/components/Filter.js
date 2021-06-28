const Filter = ({filter, handleFilterChange}) => (
    <form >
        <label htmlFor='filter'>filter shown with </label>
        <input id='filter' value={filter} onChange={handleFilterChange}/>
    </form>
)

export default Filter