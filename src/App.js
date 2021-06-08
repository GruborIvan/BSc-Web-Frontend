import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import Routes from './Routes';

const App = () => {

    return (
        <div>
            <Router>
                <Header/>
                <SideBar/>
                <Routes/>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;