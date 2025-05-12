const Meal = ({setScreen}) => {
    return ( 
        <div>
            <h1>Meal Planning</h1>
            <button onClick={()=>setScreen('list')}>Back</button>
        </div>
     );
}
 
export default Meal;