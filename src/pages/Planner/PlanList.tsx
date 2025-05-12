const PlanList = ({setScreen, screen}) => {
    return ( 
        <div className="w-full h-full flex flex-col gap-3">
            <div className="w-full h-[50px] flex gap-4 items-center">
                <button className="h-[50px] px-[20px] rounded secondary-color">All</button>
                <button className="h-[50px] px-[20px] rounded secondary-color">Created</button>
                <button className="h-[50px] px-[20px] rounded secondary-color">Saved</button>
                <button className="h-[50px] px-[20px] rounded secondary-color">Favorites</button>
                <button className={`ml-auto h-[40px] px-[10px] rounded ${screen === 'weekly' ? 'secondary-color' : ''}`} onClick={()=>setScreen('weekly')}>New Plan</button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto">
                <div className="w-full h-[60px] border-b border-opacity-30 border-gray-300 flex items-center gap-3 px-[10px]">
                    <h1 className="flex-1 truncate overflow-hidden">Plan name</h1>
                    <p className="w-[60px] truncate overflow-hidden">Author</p>
                    <p className="w-[80px] truncate overflow-hidden">Duration</p>
                    <p className="w-[150px] truncate overflow-hidden">Active days</p>
                </div>
                <div className="w-full h-[60px] secondary-color rounded flex items-center gap-3 px-[10px]">
                    <h1 className="flex-1 truncate overflow-hidden">Strength training</h1>
                    <p className="w-[60px] truncate overflow-hidden">Stefan</p>
                    <p className="w-[80px] truncate overflow-hidden">Weekly</p>
                    <p className="w-[150px] truncate overflow-hidden">12 active days</p>
                </div>
            </div>
        </div>
     );
}
 
export default PlanList;