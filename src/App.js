import React from 'react';
import HeaderBar from './Components/HeaderBar'
import DisplayGallery from './Components/DisplayGallery';
import Home from './Pages/Home';
import Store from './Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';

function App () {
    return(
        <Provider store={Store}>
            <BrowserRouter>
                <HeaderBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path=':galleryName' element={<DisplayGallery/>}/>
                </Routes>
            </BrowserRouter>            
        </Provider>

    )
}

export default App;