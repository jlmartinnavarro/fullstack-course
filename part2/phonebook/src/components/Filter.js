const Filter = ({filter, handleFilterChange}) => (
    <form >
        <label for='filter'>filter shown with </label>
        <input id='filter' value={filter} onChange={handleFilterChange}/>
    </form>
)

export default Filter