import { NavLink } from "react-router-dom";

export default function Header(){
    return <div style={{width: "100vw", height: "70px", borderBottom: "1px solid black", display: "flex", alignItems: "center"}}>
        <NavLink to="/">My Forum</NavLink>
    </div>
}