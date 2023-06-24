import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import Comments from "../pages/Comments";

export default function AllRoutes(){
    return <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/comments/:postId" element={<Comments />}/>
    </Routes>
}