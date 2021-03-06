import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import Routes from './Routes';
import { tokenSelector } from './store/selectors/AuthSelector';

const App = () => {

    const hideShowSidebar = useSelector(tokenSelector)
    const token = localStorage.getItem('token');

    return (
        <div>
            <Router>
                <Header/>
                {hideShowSidebar === '' || token === '' ? <div></div> : <SideBar/>}
                <Routes/>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;