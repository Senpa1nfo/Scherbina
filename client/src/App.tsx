import Header from "./components/header/header.tsx";
import CardList from "./components/card-list/card.list.tsx";
import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Workspace from "./components/workspace/workspace.tsx";
import Post from "./components/post/post.tsx";


function App() {

  return (
    <Box sx={{paddingBlock: '74px'}}>
        <Header/>
        <Routes>
            <Route path={'/'} element={<CardList/>}/>
            <Route path={'/:path'} element={<Post/>}/>
            <Route path={'/:path/edit'} element={<Workspace isEditing={true}/>}/>
            <Route path={'/create'} element={<Workspace isEditing={false}/>}/>
        </Routes>
    </Box>
  )
}

export default App
