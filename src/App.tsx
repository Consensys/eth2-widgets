import React from 'react'
import { DefaultLayout } from "./layouts/Layout"
import { EthereumWidget } from './components/ethereum-widgets';
// import { Router } from 'react-router-dom'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

export const App: React.FC = () => {
    return (
        <Router>
            <Routes />
        </Router>
    )
}