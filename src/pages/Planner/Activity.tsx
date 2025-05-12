const Activity = ({setScreen}) => {
    return ( 
        <div className="w-full h-full flex gap-2">
            <div className="w-3/4 h-full grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr] gap-[10px]">
                
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Monday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Tuesday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Wednesday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Thursday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Friday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Saturday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Sunday</div>
                </div>
                <div className="w-full h-full primary-color rounded"></div>
            </div>
            <div className="w-1/4 primary-color rounded h-full">
                <div>
                    {/* There will go h-2/3 with exercise and workout lists, plan info, etc. */}
                </div>
                <div>
                    {/* There will go h-1/3 with info for selected item */}
                </div>
            </div>
        </div>
     );
}
 
export default Activity;