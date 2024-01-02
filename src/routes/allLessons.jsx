import { Outlet } from "react-router-dom";

export default function AllLessons(){
    return (
        <div className="flex flex-row">
            <div className="basis-1/3"> Course Outline</div>
            <div className="basis-2/3"> 
                <Outlet/>
            </div>
        </div>
    );
}