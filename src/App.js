import React from 'react';
import HeaderBar from './Components/HeaderBar'
import DisplayPainting from './Components/DisplayPainting';
;import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';

function App () {
    return(
        <BrowserRouter>
            <HeaderBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path=':paintingName' element={<DisplayPainting/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;