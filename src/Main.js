import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import logo from "./logo.svg";
import './App.css'

import App from './App';
import AppContext from './AppContext';

import About from './About';
import Contact from './Contact';
import NavBar from './NavBar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Overlay from './Overlay';

const links = [
    {
        'label': 'Home',
        'path': '/'
    },
    {
        'label': 'About',
        'path': '/about'
    },
    {
        'label': 'Contact',
        'path': '/contact'
    },
    {
        'label': 'Settings',
        'path': '/Settings'
    }
]

const LayoutRoute = ({ path, exact, component }) => {
    return(
        <div>
            <NavBar links={links} logo={logo}/>
            <Route path={path} exact={exact} component={component}/>
            <Sidebar />
            <Overlay />
            <Footer links={links}/>
        </div>
    )
}

const Main = () => {

    const [globalState, setGlobalState] = useState(
        {
            userid: sessionStorage.getItem('userid') ? sessionStorage.getItem('userid') : null,
            loggedIn: sessionStorage.getItem('jwt') ? 'true' : 'false',
            sidebarOpen: false
        }
    )

    return (
        <AppContext.Provider value={[globalState, setGlobalState]}>
            <BrowserRouter>
                <Switch>
                    <LayoutRoute path="/" exact={true} component={App} />
                    <LayoutRoute path="/about" component={About} />
                    <LayoutRoute path="/contact" component={Contact} />
                </Switch>
            </BrowserRouter>
        </AppContext.Provider>
    )

}

export default Main;