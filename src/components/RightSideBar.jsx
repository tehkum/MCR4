import { useItems } from "../context/ItemContext"
import "./Sidebar.css"

export default function RightSideBar(){
    const {setTrend} = useItems();

    return <div className="rightsidebar">
        <button onClick={()=>setTrend("mostUpvoted")}>Most Upvoted</button>
        <button onClick={()=>setTrend("latest")}>Latest Post</button>
    </div>
}