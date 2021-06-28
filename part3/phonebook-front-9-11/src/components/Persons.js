import Person from './Person'

const Persons =  ({personsToShow, deleteHandler}) => (
    <ul>
        {personsToShow.map((person)=>(<Person key={person.id} person={person} deleteHandler={deleteHandler(person.id)}/>))}          
    </ul>
)


export default Persons