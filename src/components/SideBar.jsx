import { useItems } from "../context/ItemContext"
import "./Sidebar.css"

export default function SideBar(){
    const {userData} = useItems();

    return <><div className="sidebar">
        <p>Home</p>
        <p>Explore</p>
        <p>Bookmarks</p>
        <p>Profile</p>
        <div className="post-header" style={{position: "absolute", bottom: "10px"}}>
            <img src={userData.picUrl} alt="..." width="50" height="50" />
            <div>
            <b>{userData.name}</b>
            <p>
            @{userData.username}
            </p>
            </div>
            
          </div>
    </div>
    
    </>
}