import React,{useContext} from 'react';
import Single from './Components/Single/Single';
import TopBar from './Components/TopBar/TopBar';
import Home from './Pages/Home/Home'
import Write from './Pages/Write/write';
import Setting from './Pages/Settings/Setting';
import Login from './Pages/login/login';
import Register from './Pages/Register/Register';

import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import { Context } from './Context/context';


const App = ()=>{
    const {user}=useContext(Context);
    return (
        <Router>
            <TopBar />
            <Routes>
                <Route path='/write' element={user?<Write/>:<Login/>}></Route>
                <Route path='/setting' element={user?<Setting/>:<Register/>}></Route>
                <Route path='/login' element={user?<Home/>:<Login/>}></Route>
                <Route path='/register' element={user?<Home/>:<Register/>}></Route>
                <Route path='/post/:id' element={<Single/>} ></Route>
                <Route path='/' element={<Home/>}></Route>
            </Routes>
        </Router>
    )
}


export default App;