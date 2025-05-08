const Monthly = ({setScreen}) => {
    return ( 
        <div>
            <h1>Monthly</h1>
            <button onClick={()=>setScreen('list')}>Back</button>
        </div>
     );
}
 
export default Monthly;